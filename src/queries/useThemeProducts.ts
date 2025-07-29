import { useInfiniteQuery } from '@tanstack/react-query';
import { getThemeProducts } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useThemeProducts = (themeId: number, limit = 10) =>
  useInfiniteQuery({
    queryKey: queryKeys.themeProducts(themeId),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getThemeProducts(themeId, pageParam, limit),
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    enabled: !!themeId,
  });
