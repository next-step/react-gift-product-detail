import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ORDER_API_URL } from '@/hooks/constants/api';
import type { OrderFormValues } from '@/types/order';

interface SubmitOrderParams {
  formData: OrderFormValues;
  productId: number;
  messageCardId: string;
  authToken: string;
}

export const useOrderMutation = () => {
  return useMutation({
    mutationFn: async ({
      formData,
      productId,
      messageCardId,
      authToken,
    }: SubmitOrderParams) => {
      const res = await axios.post(
        ORDER_API_URL,
        {
          productId,
          message: formData.textMessage,
          messageCardId,
          ordererName: formData.senderName,
          receivers: formData.receivers.map(r => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.quantity,
          })),
        },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      return res.data;
    },
  });
};
