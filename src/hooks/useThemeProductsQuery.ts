import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getThemeProducts, type GetThemeProductsResponse } from '@/apis/theme';

export function useThemeProductsQuery(themeId: string) {
  return useSuspenseInfiniteQuery<GetThemeProductsResponse, Error>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => getThemeProducts(themeId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
  });
}
