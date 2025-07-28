import { useMutation } from '@tanstack/react-query';
import { postOrder } from '@/api/order';

export const useOrderMutation = () => {
  return useMutation({
    mutationFn: postOrder,
    retry: 0,
  });
};
