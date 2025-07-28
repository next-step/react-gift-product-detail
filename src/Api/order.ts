import { api } from './api';

interface OrderBody {
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

export const postOrder = (body: OrderBody) => {
  return api.post('/api/orders', body).then((res) => res.data);
};
