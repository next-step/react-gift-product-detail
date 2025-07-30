import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/products/types.ts';

interface ThemesProduct {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

async function fetchThemeProducts({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: readonly [string, string];
}): Promise<ThemesProduct> {
  const [, url] = queryKey;
  const response = await axios.get<{ data: ThemesProduct }>(`${url}?cursor=${pageParam}&limit=10`);
  return response.data.data;
}

export default function useInfiniteFetchThemesProduct(url: string) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['theme-products', url] as const,
    queryFn: fetchThemeProducts,
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  const list = data.pages.flatMap((page) => page.list);

  return {
    list,
    fetchNextPage,
    hasMore: hasNextPage ?? false,
  };
}
