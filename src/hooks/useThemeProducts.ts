import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchThemeProducts, type ThemeProductsResponse } from '@/api/themeProduct';

export const useThemeProducts = (themeId: number, limit: number = 10) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useSuspenseInfiniteQuery<ThemeProductsResponse, Error>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts(themeId, pageParam as number, limit),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap((page) => page.list) || [];

  return {
    products,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading,
  };
};
