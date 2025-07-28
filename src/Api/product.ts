import { api } from './api';
import type { ProductSummary } from '@/types/types';

interface ProductSummaryResponse {
  data: ProductSummary;
}

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
  const { data } = await api.get<ProductSummaryResponse>(`/api/products/${productId}/summary`);
  return data.data;
};
