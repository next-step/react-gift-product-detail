import { useState, useEffect, useRef, useCallback } from 'react';
import type { ProductBasicInfo } from '@/types/DTO/productDTO';
import { getThemeProducts } from '@/apis/theme';
import { useQuery } from '@tanstack/react-query';
import type { ThemeProductsResponseDTO } from '@/types/DTO/themeDTO';

export function useIntersectionObserver(themeId: number) {
  const [products, setProducts] = useState<ProductBasicInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(0);
  const limit = 10;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCursor((prev) => prev + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const { data, isLoading } = useQuery<ThemeProductsResponseDTO>({
    queryKey: ['themeProducts', themeId, cursor],
    queryFn: () => getThemeProducts(Number(themeId), cursor, limit),
  });

  useEffect(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data.list]);
      setHasMore(data.hasMoreList);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return { products, loading, observer, lastProductRef };
}
