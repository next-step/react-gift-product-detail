import { useQuery } from '@tanstack/react-query';
import { getProductReviews } from '@/api/services';

export const useProductReviewsQuery = (productId: string) => {
  return useQuery({ 
    queryKey: ['productReviews', productId],
    queryFn: () => getProductReviews(productId!),
    enabled: !!productId,
  });
};
