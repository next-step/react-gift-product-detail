import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import {
  getProductRanking,
  type GetProductRankingParams,
} from '../domain/products/getProductsRanking';
import { API_QUERY_KEY } from '../query';

export const useQueryProductsRanking = (params: GetProductRankingParams) => {
  return queryOptions({
    queryKey: API_QUERY_KEY.products.ranking(params),
    queryFn: () => getProductRanking(params),
  });
};

export const useReadProductsRanking = (params: GetProductRankingParams) => {
  return useSuspenseQuery({
    ...useQueryProductsRanking(params),
    select: (data) => data.data.data,
  });
};
