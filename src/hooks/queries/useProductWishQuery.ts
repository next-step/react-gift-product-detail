import { useQuery } from '@tanstack/react-query';
import { getProductWish } from '@/api/services';

export const useProductWishQuery = (productId: string) => {
  return useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => getProductWish(productId!),
  });
};
