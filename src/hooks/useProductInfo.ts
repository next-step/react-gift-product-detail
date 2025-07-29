import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductInfo } from '@/api/productApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ProductInfo } from '@/types/product';

export const useProductInfo = (productId: number) => {
  return useSuspenseQuery<ProductInfo>({
    queryKey: QUERY_KEYS.productInfo(productId),
    queryFn: () => fetchProductInfo(productId),
  });
};