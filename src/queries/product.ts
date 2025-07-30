import { fetchProductSummury } from '@apis/giftOrderApi';
import { fetchRankedProducts } from '@apis/rankingApi';
import { queryOptions } from '@tanstack/react-query';

export const RankedProductsOptions = (
  apiTargetType: string,
  apiRankType: string
) => {
  return queryOptions({
    queryKey: ['RankedProducts', apiTargetType, apiRankType],
    queryFn: () => fetchRankedProducts(apiTargetType, apiRankType),
  });
};

export const productSummaryOptions = (id: string | undefined) => {
  return queryOptions({
    queryKey: ['productSummary', id],
    queryFn: ({ queryKey }) => fetchProductSummury(queryKey[1]),
  });
};
