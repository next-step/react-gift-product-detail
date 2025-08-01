import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/services/product';
import { queryKeys } from '@/constants/queryKeys';

export const useProductQuery = (productId: number) => {
  return useQuery({
    queryKey: queryKeys.products.info(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
};
