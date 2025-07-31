import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/routes/Router';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface OrderPayload {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}

export const useOrderSubmit = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const authToken = user?.authToken;

  const submitOrder = async (orderPayload: OrderPayload) => {
    const res = await api.post('/order', orderPayload, {
      headers: { Authorization: authToken },
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      toast.success('주문이 완료되었습니다.');
    },
    onError: (err: unknown) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate(ROUTE_PATH.LOGIN);
      } else {
        toast.error('주문 중 오류가 발생했습니다.');
        console.error(err);
      }
    },
  });

  return {
    submitOrder: mutation.mutate,
    ...mutation,
  };
};
