import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductSummary, type ProductSummary } from '@/apis/product';

export function useProductSummaryQuery(productId: number) {
  return useSuspenseQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(productId),
  });
}
