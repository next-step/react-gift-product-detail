import { useMutation } from "@tanstack/react-query";
import { orderProduct } from "@/services/order";
import type { OrderRequest, OrderResponse } from "@/services/order";

export function useOrderMutation(authToken: string) {
  return useMutation<OrderResponse, Error, OrderRequest>({
    mutationFn: (data) => orderProduct(data, authToken),
  });
}
