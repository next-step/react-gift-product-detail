import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/api/ProductApi';
import type { ProductSummary } from '@/types/Product';

export function useProductSummary(productId: string | undefined) {
  const { data: product } = useSuspenseQuery<ProductSummary>({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProduct(productId!),
  });

  return { product };
}
