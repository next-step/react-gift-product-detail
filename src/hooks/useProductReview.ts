import { useQuery } from '@tanstack/react-query';
import { ProductReviewQueryOptions } from '../query/queryOptions';

export const useProductReview = (productId: number) => {
  return useQuery(ProductReviewQueryOptions(productId));
};
