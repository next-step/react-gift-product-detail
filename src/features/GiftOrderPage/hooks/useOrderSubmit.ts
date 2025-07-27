import type { MultiOrderFormData } from '@schemas/orderSchema';
import { useAuth } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { ProductSummaryInfo } from '../OrderTypes';
import { useMutation } from '@tanstack/react-query';
import { postOrder } from '@apis/giftOrderApi';
import axios from 'axios';

interface OrderResponse {
  success: boolean;
}

interface OrderMutationParams {
  formData: MultiOrderFormData;
}

const useOrderSubmit = (productInfo: ProductSummaryInfo | null) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: postMutate } = useMutation({
    mutationFn: postOrder,

    onSuccess: (data: OrderResponse) => {
      if (data.success) {
        toast.success('주문 완료', {
          autoClose: 1000,
          onClose: () => navigate('/'),
        });
      } else {
        toast.error('주문 실패');
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error) && error.status == 401) {
        toast.error(error.message, {
          autoClose: 1000,
          onClose: () => navigate('/login'),
        });
      } else {
        toast.error(error.message);
      }
    },
  });

  return async ({ formData }: OrderMutationParams) => {
    const { message, sender, recipients, messageCardId } = formData;
    const requestBody = {
      productId: productInfo?.id,
      message,
      messageCardId,
      ordererName: sender,
      receivers: recipients.map((r) => ({
        name: r.receiver,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };

    postMutate({
      body: requestBody,
      options: {
        headers: {
          Authorization: user?.authToken || '',
        },
      },
    });
  };
};

export default useOrderSubmit;
