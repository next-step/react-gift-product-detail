import { useQuery } from '@tanstack/react-query';
import { ProductDescriptionQueryOptions } from '../query/queryOptions';

export const useProductDetail = (productId: number) => {
  return useQuery(ProductDescriptionQueryOptions(productId));
};
