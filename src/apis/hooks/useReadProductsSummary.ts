import { useSuspenseQuery } from '@tanstack/react-query';
import { API_QUERY_KEY } from '../query';
import {
  getProductsSummary,
  type GetProductsSummaryParams,
} from '../domain/products/getProductsSummary';

export const useReadProductsSummary = (params: GetProductsSummaryParams) => {
  return useSuspenseQuery({
    queryKey: API_QUERY_KEY.products.summary(params.productId),
    queryFn: () => getProductsSummary(params),
    select: (data) => data.data.data,
  });
};
