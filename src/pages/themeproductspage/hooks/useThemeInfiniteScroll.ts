import { useRef, useCallback, useState, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import type { Product, ThemeProductResponse } from "@/types/api_types";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

interface ThemeInfiniteScrollOptions {
  themeId: string;
  initialCursor?: number | null;
  threshold?: number;
}

export function useThemeInfiniteScroll({
  themeId,
  initialCursor = null,
  threshold = 0.5,
}: ThemeInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { data: initialData } = useSuspenseApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}`,
    queryKey: ["theme-products", themeId, "initial"],
  });

  const {
    isLoading: queryLoading,
    error: queryError,
    refetch,
  } = useApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}${cursor ? `?cursor=${cursor}` : ""}`,
    queryKey: ["theme-products", themeId, cursor],
    enabled: false,
  });

  useEffect(() => {
    if (initialData) {
      setProducts(initialData.list);
      setCursor(initialData.cursor ?? null);
      setHasMore(
        initialData.hasMoreList !== false && !!initialData.list.length
      );
    }
  }, [initialData]);

  const fetchNext = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await refetch();
      const res = result.data as ThemeProductResponse;
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = res.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(res.cursor ?? null);
      setHasMore(res.hasMoreList !== false && !!res.list.length);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [refetch, hasMore, isLoading]);

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNext,
    enabled: hasMore && !isLoading && products.length > 0,
    threshold,
  });

  return {
    products,
    isLoading: isLoading || queryLoading,
    hasMore,
    error: error || queryError,
    observerRef,
    fetchNext,
  };
}
