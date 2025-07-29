import { useQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useProductSummary = (productId: number | null | undefined) =>
  useQuery({
    queryKey: queryKeys.productSummary(productId as number),
    queryFn: () => getProductSummary(productId as number),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
