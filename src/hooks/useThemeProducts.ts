import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getThemeProductsUrl } from './constants/api';
import type { Product } from '@/types/product';
import { useRef } from 'react';

const THEME_PRODUCT_PAGE_LIMIT = 10;

interface ThemeProductResponse {
  list: Product[];
  hasMoreList: boolean;
  cursor: number;
}

const fetchThemeProducts = async ({
  pageParam = 0,
  themeId,
}: {
  pageParam?: number;
  themeId: string;
}): Promise<ThemeProductResponse> => {
  const res = await fetch(
    `${getThemeProductsUrl(themeId)}?cursor=${pageParam}&limit=${THEME_PRODUCT_PAGE_LIMIT}`
  );
  if (!res.ok) throw new Error('Failed to fetch theme products');

  const json = await res.json();
  return json.data;
};

export const useThemeProducts = (themeId: string | undefined) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['themeProducts', themeId],
      enabled: !!themeId,
      queryFn: ({ pageParam }) => {
        if (!themeId) throw new Error('themeId is required');
        return fetchThemeProducts({ pageParam, themeId });
      },
      getNextPageParam: lastPage =>
        lastPage.hasMoreList ? lastPage.cursor : undefined,
      initialPageParam: 0,
    });

  const products = data ? data.pages.flatMap(page => page.list) : [];

  useIntersectionObserver({
    target: observerRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isLoading,
  });

  return {
    products,
    isLoading,
    isError,
    hasMore: hasNextPage,
    observerRef,
  };
};
