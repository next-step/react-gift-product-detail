import { useMutation } from '@tanstack/react-query';
import { postOrder } from './apis';

export function useOrderMutation(options?: any) {
  return useMutation({
    mutationFn: ({
      orderData,
      authToken,
    }: {
      orderData: any;
      authToken: string;
    }) => postOrder(orderData, authToken),
    ...options,
  });
}
