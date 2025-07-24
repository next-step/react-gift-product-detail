import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchThemeProducts } from '@/api/ThemeListApi';
import type { Product } from '@/types/Product';

interface InfiniteResponse<T> {
  list: T[];
  cursor: number;
  hasMoreList: boolean;
}

export default function useThemeProducts(themeId: number) {
  return useInfiniteQuery<InfiniteResponse<Product>, Error>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts(themeId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
    enabled: !!themeId,
  });
}
