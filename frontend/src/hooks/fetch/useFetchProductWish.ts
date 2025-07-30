import useFetchData from '@/hooks/fetch/useFetchData.ts';
import { PRODUCT_WISH_URL } from '@/api/api.ts';
import type { WishProps } from '@/types/products/detail/wishTypes.ts';

export default function useFetchProductWish(productId: number) {
  const { data } = useFetchData<WishProps>(['productWish', productId], PRODUCT_WISH_URL(productId));

  return data?.data;
}
