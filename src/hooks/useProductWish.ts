import { useQuery } from '@tanstack/react-query';
import { ProductWishQueryOptions } from '../query/queryOptions';
import type { ProductWish } from '../types/Products';

export const useProductWish = (productId: number) => {
  return useQuery<ProductWish, Error>(
    ProductWishQueryOptions(productId)
  );
};
