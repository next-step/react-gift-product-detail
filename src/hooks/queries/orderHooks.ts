import { useMutation } from '@tanstack/react-query';
import { orderProduct, type OrderRequest } from '@/apis/order';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductSummary, type ProductSummary } from '@/apis/product';

export function useOrderMutation() {
  return useMutation<void, Error, { data: OrderRequest; authToken: string }>({
    mutationFn: ({ data, authToken }) => orderProduct(data, authToken),
  });
}

export function useProductSummaryQuery(productId: number) {
  return useSuspenseQuery<ProductSummary, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () => getProductSummary(productId),
  });
}
