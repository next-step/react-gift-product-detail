import { api } from './api';

export interface OrderBody {
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

export const postOrder = async (body: OrderBody): Promise<any> => {
  const res = await api.post('/api/order', body);
  return res.data;
};
