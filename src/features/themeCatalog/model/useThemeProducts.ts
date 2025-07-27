import { getThemeProducts } from '@/entities/theme/api/themeApi';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

export const useThemeProducts = (themeId: number, limit: number = 15) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: QUERY_KEYS.THEME_PRODUCTS(themeId),
    queryFn: ({ pageParam = 0 }) => getThemeProducts(themeId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap(page => page.list) ?? [];

  return { 
    products, 
    hasMore: hasNextPage, 
    fetchNextPage,
    isFetchingNextPage,
  };
};