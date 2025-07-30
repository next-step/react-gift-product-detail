import { useQuery} from '@tanstack/react-query';
import { getProduct } from '@/api/services';

export const useProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
  });
};
