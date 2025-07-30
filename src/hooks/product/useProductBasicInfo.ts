import { useParams } from 'react-router-dom';
import { getProductBasicInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

function useProductBasicInfo() {
  const { productId } = useParams();

  const { data: productBasicInfo, isLoading } = useQuery({
    queryKey: ['productBasicInfo', productId],
    queryFn: () => getProductBasicInfo(Number(productId)),
  });

  return {
    productBasicInfo,
    isLoading,
  };
}

export default useProductBasicInfo;
