import useFetchData from '@/hooks/fetch/useFetchData.ts';
import { PRODUCT_URL } from '@/api/api.ts';
import type { Product } from '@/types/products/types.ts';

export default function useFetchProductData(productId: number) {
  const { data } = useFetchData<Product>(['productId', productId], PRODUCT_URL(productId));

  return {
    data: data?.data,
  };
}
