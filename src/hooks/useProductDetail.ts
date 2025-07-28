import { useQuery } from '@tanstack/react-query';
import { ProductDescriptionQueryOptions } from '../query/queryOptions';
import type { ProductDetail } from '../types/Products';

export const useProductDetail = (productId: number) => {
  return useQuery<ProductDetail, Error>(
    ProductDescriptionQueryOptions(productId)
  );
};
