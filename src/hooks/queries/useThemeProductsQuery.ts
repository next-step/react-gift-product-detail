import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getThemeProductList } from '@/services/theme';
import { queryKeys } from '@/constants/queryKeys';

export const useThemeProductsQuery = (themeId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: queryKeys.themes.productList(themeId),
    queryFn: ({ pageParam = 0 }) => getThemeProductList(themeId, pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    initialPageParam: 0,
  });
};
