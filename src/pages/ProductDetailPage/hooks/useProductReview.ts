import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';
import type { ProductReview } from '../types';

export const useProductDetailReview = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductReview }>(
    ['product', productId || '', 'review'],
    productId ? `/products/${productId}/highlight-review` : '',
    { enabled: !!productId }
  );
  return data.data;
};
