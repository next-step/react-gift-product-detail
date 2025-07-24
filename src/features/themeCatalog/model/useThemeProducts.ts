import { getThemeProducts } from '@/entities/theme/api/themeApi';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useThemeProducts = (themeId: number, limit: number = 15) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['themeProducts', themeId],
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