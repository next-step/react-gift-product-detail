import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/api/product';
import type { ProductSummary } from '@/api/product';

export const useProductSummary = (productId?: number) => {
  const {
    data: product,
  } = useSuspenseQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(productId!),
  });

  return { product };
};
