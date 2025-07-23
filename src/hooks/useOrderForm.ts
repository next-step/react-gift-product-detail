import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { postOrder } from '@/api/order';
import { useMutation } from '@tanstack/react-query';

export interface OrderFormInputs {
  senderName: string;
  recipients: {
    name: string;
    phone: string;
    quantity: number;
  }[];
}

export const useOrderForm = (productId: number) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { imageURL, name, price, brandInfo } = location.state || {};

  const methods = useForm<OrderFormInputs>({
    defaultValues: {
      senderName: user?.name || '',
      recipients: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (orderData: any) => postOrder(orderData, token || ''),
    onSuccess: () => {
      toast.success('주문이 완료되었습니다!');
      navigate('/');
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toast.error(
          error.response?.data?.message || '주문 중 오류가 발생했습니다.'
        );
      }
    },
  });

  const order = ({
    message,
    messageCardId,
  }: {
    message: string;
    messageCardId: string;
  }) => {
    const values = methods.getValues();

    if (!message || !messageCardId) {
      toast.error('메시지 또는 카드가 선택되지 않았습니다.');
      return;
    }

    if (values.recipients.length === 0) {
      toast.error('받는 사람을 한 명 이상 추가해주세요.');
      return;
    }

    const receivers = values.recipients.map((r) => ({
      name: r.name,
      phoneNumber: r.phone,
      quantity: r.quantity,
    }));

    mutation.mutate({
      productId,
      ordererName: values.senderName,
      message,
      messageCardId,
      receivers,
    });
  };

  return {
    imageURL,
    name,
    price,
    brandInfo,
    methods,
    handleSubmit: methods.handleSubmit,
    order,
    isLoading: mutation.isPending,
  };
};
