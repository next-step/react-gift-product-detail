import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '@/api/services';
import { toastError, toastSuccess } from '@/utils/toast';
import axios from 'axios';
import type { OrderPayload } from '@/types';

export const useCreateOrderMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (orderData: OrderPayload) => createOrder(orderData),
    onSuccess: () => {
      toastSuccess('주문이 성공적으로 완료되었습니다!');
      navigate('/');
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toastError('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toastError('주문 처리 중 오류가 발생했습니다.');
      }
    },
  });
};
