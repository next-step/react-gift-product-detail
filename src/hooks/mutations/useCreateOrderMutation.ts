import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/services/order';
import { queryKeys } from '@/constants/queryKeys';
import { toast } from 'react-toastify';
import { ApiError } from '@/errors/ApiError';

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // 주문 성공 후, 모든 상품 관련 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('주문에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });
};
