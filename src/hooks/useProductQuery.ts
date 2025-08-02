import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductRanking, fetchProductSummary } from '../api/productApi';
import type { Product, ProductSummary } from '../types/product';

export const useProductRankingQuery = (targetType: string = 'ALL', rankType: string = 'MANY_WISH') => {
  return useSuspenseQuery<Product[]>({
    queryKey: ['productRanking', targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
  });
};

export const useProductSummaryQuery = (productId: number) => {
  return useSuspenseQuery<ProductSummary>({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
  });
};
