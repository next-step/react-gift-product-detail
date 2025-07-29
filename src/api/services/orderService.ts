import authClient from '../clients/authClient';

interface OrderService {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

export const orderService = async ({
  productId,
  message,
  messageCardId,
  ordererName,
  receivers,
}: OrderService) => {
  const response = await authClient.post('/api/order', {
    productId,
    message,
    messageCardId,
    ordererName,
    receivers,
  });
  return response.data;
};
