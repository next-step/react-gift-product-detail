import type { ProductWish } from '../types/Products';
import { fetcher } from './client';

export const fetchProductWish = async (
  productId: number
): Promise<ProductWish> => {
  const endpoint = `/api/products/${productId}/wish`;
  const res = await fetcher(
    endpoint,
    '좋아요 수를 불러오지 못했습니다.'
  );
  return res.data;
};
