import { useQuery } from '@tanstack/react-query';
import { ProductWishQueryOptions } from '../query/queryOptions';

export const useProductWish = (productId: number) => {
  return useQuery(ProductWishQueryOptions(productId));
};
