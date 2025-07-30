import { useParams } from 'react-router-dom';
import { getProductDetailInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

function useProductDetailInfo() {
  const { productId } = useParams();

  const { data: productDetailInfo, isLoading } = useQuery({
    queryKey: ['productDetailInfo', productId],
    queryFn: () => getProductDetailInfo(Number(productId)),
  });

  return {
    productDetailInfo,
    isLoading,
  };
}

export default useProductDetailInfo;
