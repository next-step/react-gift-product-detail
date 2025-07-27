import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api/orderApi';
import type { OrderRequest, OrderResponse } from '../types/order';

export const useCreateOrderMutation = () => {
  return useMutation<OrderResponse, Error, { orderData: OrderRequest; authToken: string }>({
    mutationFn: ({ orderData, authToken }) => createOrder(orderData, authToken),
  });
};
