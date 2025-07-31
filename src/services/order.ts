import { api } from './api';
import type { OrderInfo } from '@/types/order';

export const createOrder = async (orderData: OrderInfo): Promise<void> => {
  await api.post('/order', orderData);
};
