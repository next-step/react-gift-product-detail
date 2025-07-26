import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';
import type { Product } from '../types';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: Product }>(
    ['product', productId || ''],
    productId ? `/products/${productId}` : '',
    { enabled: !!productId }
  );
  const product = data.data;
  return { product };
};
