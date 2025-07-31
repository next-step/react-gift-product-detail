import { useQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/services/product';
import { queryKeys } from '@/constants/queryKeys';

export const useProductSummaryQuery = (productId: number) => {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => getProductSummary(productId),
    enabled: !!productId,
  });
};
