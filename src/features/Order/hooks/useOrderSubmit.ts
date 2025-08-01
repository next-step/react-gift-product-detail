import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import { apiPost } from '@/lib/axios';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/routes/Router';
import { useMutation } from '@tanstack/react-query';

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

  const submitOrder = async (orderPayload: OrderPayload): Promise<void> => {
    await apiPost<void, OrderPayload>('/order', orderPayload, {
      headers: { Authorization: authToken },
    });
  };

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      toast.success('주문이 완료되었습니다.');
    },
    onError: (err: unknown) => {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;

      if (status === 401) {
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
