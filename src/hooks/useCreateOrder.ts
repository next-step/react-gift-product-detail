import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/order';
import type { CreateOrderPayload } from '@/api/order';

export function useCreateOrder() {
  return useMutation<void, Error, { payload: CreateOrderPayload; token: string }>({
    mutationFn: ({ payload, token }) => createOrder(payload, token),
  });
}
