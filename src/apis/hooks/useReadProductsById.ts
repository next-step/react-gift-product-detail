import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getProductsById, type GetProductsByIdParams } from '../domain/products/getProductsById';
import { API_QUERY_KEY } from '../query';

export const useQueryProductsById = (params: GetProductsByIdParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.products.byId(params.productId),
    queryFn: () => getProductsById(params),
    select: (data) => data.data.data,
  });
};

export const useReadProductsById = (params: GetProductsByIdParams) => {
  return useSuspenseQuery({
    ...useQueryProductsById(params),
  });
};
