import type { ProductReview } from '../types/Products';
import { fetcher } from './client';

export const fetchProductReview = async (
  productId: number
): Promise<ProductReview> => {
  const endpoint = `/api/products/${productId}/highlight-review`;
  const res = await fetcher(
    endpoint,
    '상품 리뷰를 불러오지 못했습니다.'
  );
  return res.data;
};
