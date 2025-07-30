import { getFetch } from '@src/api/getFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { GoodSummary } from '@src/types/Goods';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderForm = (productId: string | undefined) => {
  const { data, isError, isLoading } = useQuery<GoodSummary>({
    queryKey: ['productSummary', { productId }],
    queryFn: () => getFetch<GoodSummary>(`${BASIC_ENDPOINT.product}/${productId}/summary`, {}),
  });
  return { data: data?.data, isError, isLoading };
};
