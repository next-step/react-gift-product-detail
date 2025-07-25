import { useMutation } from '@tanstack/react-query';
import { orderProduct, type OrderRequest } from '@/apis/order';

export function useOrderMutation() {
  return useMutation<void, Error, { data: OrderRequest; authToken: string }>({
    mutationFn: ({ data, authToken }) => orderProduct(data, authToken),
  });
}
