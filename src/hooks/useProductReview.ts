import { useQuery } from '@tanstack/react-query';
import { ProductReviewQueryOptions } from '../query/queryOptions';
import type { ProductReview } from '../types/Products';

export const useProductReview = (productId: number) => {
  return useQuery(ProductReviewQueryOptions(productId));
};
