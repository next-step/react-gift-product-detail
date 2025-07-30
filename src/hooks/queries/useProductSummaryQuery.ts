import { useQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/api/services';

export const useProductSummaryQuery = (productId?: string) => {
  return useQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(productId!),
    enabled: !!productId, 
  });
};
