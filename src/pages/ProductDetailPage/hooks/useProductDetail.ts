import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';
import type { ProductDetail } from '../types';

export const useProductDetailDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductDetail }>(
    ['product', productId || '', 'detail'],
    productId ? `/products/${productId}/detail` : '',
    { enabled: !!productId }
  );
  return data.data;
};
