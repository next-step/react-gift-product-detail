import { useQuery } from '@tanstack/react-query';
import { fetchProductRanking, fetchProductSummary } from '../api/productApi';
import type { Product, ProductSummary } from '../types/product';

export const useProductRankingQuery = (targetType: string = 'ALL', rankType: string = 'MANY_WISH') => {
  return useQuery<Product[]>({
    queryKey: ['productRanking', targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
  });
};

export const useProductSummaryQuery = (productId: number) => {
  return useQuery<ProductSummary>({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
  });
};
