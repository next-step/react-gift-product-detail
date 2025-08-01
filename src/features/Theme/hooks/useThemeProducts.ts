import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/axios';
import type { Product } from '../ThemeHero/ThemeTypes';
import type { Result } from '@/types/CommonTypes';
import { queryKeys } from '@/lib/queryKeys';

interface ThemeProductResponse {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

const fetchThemeProducts = async ({
  themeId,
  cursor = 0,
  limit = 10,
}: {
  themeId: number | null;
  cursor?: number;
  limit?: number;
}): Promise<ThemeProductResponse | null> => {
  if (!themeId) return null;

  const res = await apiGet<ThemeProductResponse>(
    `/themes/${themeId}/products`,
    {
      params: { cursor, limit },
    }
  );

  return res;
};

export const useThemeProducts = (themeId: number | null, limit = 10) => {
  const { data, fetchNextPage, hasNextPage, refetch } =
    useSuspenseInfiniteQuery({
      queryKey: ['themeProducts', themeId],
      queryFn: ({ pageParam = 0 }) =>
        fetchThemeProducts({ themeId, cursor: pageParam, limit }),
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        return lastPage.hasMoreList ? lastPage.cursor : undefined;
      },
      initialPageParam: 0,
    });

  const products = data?.pages.flatMap((page) => page?.list ?? []) ?? [];

  return {
    products,
    fetchNextPage,
    hasMore: !!hasNextPage,
    refetch,
  };
};
