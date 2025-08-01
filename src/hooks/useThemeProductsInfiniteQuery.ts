import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchThemeProducts } from '@/api/categoryApi';

export function useThemeProductsInfiniteQuery(themeId: number) {
  return useSuspenseInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts(themeId, pageParam, 10),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
  });
}
