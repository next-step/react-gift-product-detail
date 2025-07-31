import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { postOrder } from '@/api/order';
import { useMutation } from '@tanstack/react-query';
import { TOAST_MESSAGES } from '@/constants/messages';

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
      toast.success(TOAST_MESSAGES.ORDER_SUCCESS);
      navigate('/');
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
        navigate('/login');
      } else {
        toast.error(
          error.response?.data?.message || TOAST_MESSAGES.ORDER_ERROR
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
      toast.error(TOAST_MESSAGES.NO_MESSAGE_OR_CARD);
      return;
    }

    if (values.recipients.length === 0) {
      toast.error(TOAST_MESSAGES.ADD_RECIPIENT);
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
