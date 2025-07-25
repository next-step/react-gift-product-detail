import { getThemeProducts } from '@/entities/theme/api/themeApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

export const useThemeProducts = (themeId: number, limit: number = 15) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.THEME_PRODUCTS(themeId),
    queryFn: ({ pageParam = 0 }) => getThemeProducts(themeId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap(page => page.list) ?? [];

  return { 
    products, 
    isLoading, 
    isError,
    hasMore: hasNextPage, 
    fetchNextPage,
    isFetchingNextPage,
  };
};