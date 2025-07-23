import axiosInstance from './axiosInstance';
import type { OrderRequest } from '@/types/order';

export const postOrder = async (order: OrderRequest) => {
  const response = await axiosInstance.post('/order', order);
  return response.data.data;
};
