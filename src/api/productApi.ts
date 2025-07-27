import API from './axiosInstance';
import type { ProductSummary } from '@/types/product';

export const fetchProductSummary = async (id: number): Promise<ProductSummary> => {
  const res = await API.get(`/api/products/${id}/summary`);
  return res.data.data; 
};
