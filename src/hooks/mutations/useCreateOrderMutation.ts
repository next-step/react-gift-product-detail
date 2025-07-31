import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/services/order';
import { queryKeys } from '@/constants/queryKeys';

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // 주문 성공 후, 모든 상품 관련 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};
