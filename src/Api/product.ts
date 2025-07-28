import type { ProductRankingItem } from '@/services/product';
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

export const getProductRanking = async (
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN',
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE'
): Promise<{ data: ProductRankingItem[] }> => {
  const res = await api.get('/api/products/ranking', {
    params: { targetType, rankType },
  });
  return res.data;
};
