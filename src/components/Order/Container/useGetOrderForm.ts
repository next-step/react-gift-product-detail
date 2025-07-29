import { useApiQuery } from '@src/api/useApiQuery';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { GoodSummary } from '@src/types/Goods';

export const useGetOrderForm = (productId: string | undefined) => {
  const { nullNotData: goodSummary, isError } = useApiQuery<GoodSummary>({
    endpoint: `${BASIC_ENDPOINT.product}/${productId}/summary`,
    queryKey: ['productSummary', { productId }],
    enabled: !!productId,
  });

  return { goodSummary, isError };
};
