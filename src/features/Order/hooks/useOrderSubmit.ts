import { useUserContext } from '@/contexts/UserContext';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
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
      toast.error('주문 중 오류가 발생했습니다.');
      console.error(err);
    },
  });

  return {
    submitOrder: mutation.mutate,
    ...mutation,
  };
};
