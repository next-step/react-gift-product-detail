import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductInfo } from '@/api/ProductInfoApi';
import type { Product } from '@/types/Product';

export function useProductInfo(productId: string | number) {
  return useSuspenseQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductInfo(String(productId)),
  });
}
