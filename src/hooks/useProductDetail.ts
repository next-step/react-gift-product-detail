import { useQuery } from '@tanstack/react-query';
import { getProductInfo } from '@/api/productInfo';

const useProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductInfo(productId),
    enabled: !!productId,
  });
};

export default useProductDetail;
