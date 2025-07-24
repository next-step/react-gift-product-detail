import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductRanking, fetchProductSummary, fetchThemeProducts } from '@/api/product';

export const useProductRanking = (targetType: string, rankType: string) => {
  return useQuery({
    queryKey: ['productRanking', targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
    staleTime: 1000 * 60 * 3,
  });
};

export const useProductSummary = (productId: number) => {
  return useQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 3,
  });
};

export const useThemeProductsInfinite = (themeId: number, limit = 20) => {
  return useInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts({ themeId, cursor: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    enabled: !!themeId,
    staleTime: 1000 * 60 * 3,
  });
};
