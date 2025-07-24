import { useSuspenseApiQuery } from "@/hooks/useSuspenseApiQuery";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useEffect, useRef, useState, useCallback } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import type { Product, ThemeProductResponse } from "@/types/api_types";

interface UseThemeProductListProps {
  themeId: string | undefined;
}

export function useThemeProductList({ themeId }: UseThemeProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: initialData } = useSuspenseApiQuery<ThemeProductResponse>({
    url: `/api/themes/${themeId}/products`,
    queryKey: ["theme-products", themeId, "initial"],
  });

  const { data, isLoading, isError, error, refetch } =
    useApiQuery<ThemeProductResponse>({
      url: `/api/themes/${themeId}/products${cursor ? `?cursor=${cursor}` : ""}`,
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
      setInitLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (isError && error) {
      throw error;
    }
  }, [isError, error]);

  useEffect(() => {
    if (data && cursor) {
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = data.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(data.cursor ?? null);
      setHasMore(data.hasMoreList !== false && !!data.list.length);
    }
  }, [data]);

  const handleObserver = useCallback(() => {
    if (hasMore && !isLoading && !initLoading && products.length > 0) {
      refetch();
    }
  }, [hasMore, isLoading, initLoading, products.length, refetch]);

  useInfiniteScroll({
    targetRef: observerRef,
    onIntersect: handleObserver,
    enabled: hasMore && !isLoading && !initLoading && products.length > 0,
    threshold: 0.4,
  });

  return {
    products,
    isLoading,
    initLoading,
    hasMore,
    observerRef,
  };
}
