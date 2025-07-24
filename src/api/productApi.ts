import API from './axiosInstance';
import type { ProductSummary } from '@/types/product';

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const res = await API.get<{ data: ProductSummary }>(`/api/products/${productId}`);
  return res.data.data;
};