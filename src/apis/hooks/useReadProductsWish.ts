import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { API_QUERY_KEY } from '../query';
import { getProductsWish, type GetProductsWishParams } from '../domain/products/getProductsWish';

export const useQueryProductsWish = (params: GetProductsWishParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.products.wish(params.productId),
    queryFn: () => getProductsWish(params),
  });
};

export const useReadProductsWish = (params: GetProductsWishParams) => {
  return useSuspenseQuery({
    ...useQueryProductsWish(params),
    select: (data) => data.data.data,
  });
};
