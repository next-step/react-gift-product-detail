import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/api/apiClient';
import { GiftItem } from '@/constants/GiftItem';

interface ThemeProductsResponse {
  list: GiftItem[];
  cursor: number;
  hasMoreList: boolean;
}

interface ApiResponse<T> {
  data: T;
}

const PRODUCTS_LIMIT = 10;

export function useThemeProducts(themeId: number) {
  const [products, setProducts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const cursorRef = useRef<number>(0);
  const loadingRef = useRef<boolean>(loading); // Create a ref for loading state

  // Update the loadingRef whenever loading state changes
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const fetchProducts = useCallback(async (currentCursor: number) => {
    if (!themeId || loadingRef.current) return null; // Use loadingRef.current

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<ApiResponse<ThemeProductsResponse>>(
        `/api/themes/${themeId}/products`,
        {
          params: { cursor: currentCursor, limit: PRODUCTS_LIMIT },
        }
      );

      if (res.data.data) {
        return res.data.data;
      }
      return null;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [themeId]); // loading removed from dependencies

  const fetchMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return; // Use loadingRef.current

    const data = await fetchProducts(cursorRef.current);
    if (data) {
      setProducts((prevProducts) => {
        const newProducts = data.list.filter(
          (newItem) => !prevProducts.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevProducts, ...newProducts];
      });
      cursorRef.current = data.cursor;
      setHasMore(data.hasMoreList);
    }
  }, [hasMore, fetchProducts]); // loading removed from dependencies

  useEffect(() => {
    setProducts([]);
    cursorRef.current = 0;
    setHasMore(true);
    setError(null);

    const initialFetch = async () => {
      const data = await fetchProducts(0);
      if (data) {
        setProducts(data.list);
        cursorRef.current = data.cursor;
        setHasMore(data.hasMoreList);
      }
    };
    initialFetch();
  }, [themeId, fetchProducts]);

  return { products, loading, error, fetchMore, hasMore };
}
