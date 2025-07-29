import { useApiQuery } from '@src/api/useApiQuery';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { GoodSummary } from '@src/types/Goods';

type GoodSummaryErrorMsg = {
  data: {
    status: string;
    statusCode: number;
    message: string;
  };
};
export const useGetOrderForm = (productId: string | undefined) => {
  const { nullNotData: GoodSummary } = useApiQuery<GoodSummary>({
    endpoint: `${BASIC_ENDPOINT.product}/${productId}/summary`,
    queryKey: ['productSummary', { productId }],
    enabled: !!productId,
  });

  return GoodSummary;
};
