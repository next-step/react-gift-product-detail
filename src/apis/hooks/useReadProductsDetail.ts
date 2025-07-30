import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { API_QUERY_KEY } from '../query';
import {
  getProductsDetail,
  type GetProductsDetailParams,
} from '../domain/products/getProductsDetail';
import { useQueryProductsById } from './useReadProductsById';

export const useQueryProductsDetail = (params: GetProductsDetailParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.products.detail(params.productId),
    queryFn: () => getProductsDetail(params),
  });
};

export const useReadProductsById = (params: GetProductsDetailParams) => {
  return useSuspenseQuery({
    ...useQueryProductsById(params),
    select: (data) => data.data.data,
  });
};
