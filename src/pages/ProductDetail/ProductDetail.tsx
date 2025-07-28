import { useParams } from 'react-router-dom';

import { getProductBasicInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';

function ProductDetail() {
  const { productId } = useParams();
  const { data: productBasicInfo } = useQuery({
    queryKey: ['productBasicInfo', productId],
    queryFn: () => getProductBasicInfo(Number(productId)),
  });
  console.log(productBasicInfo);
  return <div>ProductDetail</div>;
}

export default ProductDetail;