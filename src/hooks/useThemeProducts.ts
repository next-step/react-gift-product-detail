import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThemeProducts } from '@/api/themesApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ThemeProductResponse } from '@/types/themeProduct';

export const useThemeProducts = (themeId?: number) => {
  return useInfiniteQuery<ThemeProductResponse, Error>({
    queryKey: themeId ? QUERY_KEYS.themeProducts(themeId) : [],
    queryFn: ({ pageParam }) =>
      fetchThemeProducts(themeId!, pageParam as number), 
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
  });
};
