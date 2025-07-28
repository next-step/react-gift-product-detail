import { api } from './api';
import type { ProductSummary } from '@/types/types';

interface ProductSummaryResponse {
  data: ProductSummary;
}

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
  const { data } = await api.get<ProductSummaryResponse>(`/api/products/${productId}/summary`);
  return data.data;
};

export interface ThemeListItem {
  themeId: number;
  name: string;
  image: string;
}

export const getThemeList = async (): Promise<ThemeListItem[]> => {
  const { data } = await api.get<{ data: ThemeListItem[] }>('/api/themes');
  return data.data;
};
