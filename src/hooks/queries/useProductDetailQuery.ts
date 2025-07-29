import { useQuery } from '@tanstack/react-query';
import { getProductDetailInfo } from '@/api/services';

export const useProductDetailQuery = (productId: string) => {
  return useQuery({ 
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetailInfo(productId!),
    enabled: !!productId,
  });
};
