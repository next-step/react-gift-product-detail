import authClient from '../clients/authClient';
import type { OrderForm } from '../types/order.dto';

export const orderService = async ({
  productId,
  message,
  messageCardId,
  ordererName,
  receivers,
}: OrderForm) => {
  const response = await authClient.post('/api/order', {
    productId,
    message,
    messageCardId,
    ordererName,
    receivers,
  });
  return response.data;
};
