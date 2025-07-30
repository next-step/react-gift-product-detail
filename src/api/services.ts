import { client } from './client';
import type { GenderFilter, SortFilter } from '@/components/RankingTabs';
import type { Product, ProductDetail, ProductWish, ProductReview } from '@/types';

export const getThemes = async () => {
  const response = await client.get('/api/themes');
  return response.data.data;
};

export const getRanking = async (targetType: GenderFilter, rankType: SortFilter) => {
  const rankTypeMap: Record<SortFilter, string> = {
    WANT: 'MANY_WISH',
    RECEIVE: 'MANY_RECEIVE',
    WISH_RECEIVE: 'MANY_WISH_RECEIVE',
  };

  const response = await client.get('/api/products/ranking', {
    params: {
      targetType,
      rankType: rankTypeMap[rankType],
    },
  });
  return response.data.data;
};

export const getProduct = async (productId: string): Promise<Product> => {
  const response = await client.get(`/api/products/${productId}`);
  return response.data.data;
};

export const getProductDetailInfo = async (productId: string): Promise<ProductDetail> => {
  const response = await client.get(`/api/products/${productId}/detail`);
  return response.data.data;
};

export const getProductReviews = async (productId: string): Promise<{ totalCount: number, reviews: ProductReview[] }> => {
  const response = await client.get(`/api/products/${productId}/highlight-review`);
  return response.data.data;
};

export const getProductWish = async (productId: string): Promise<ProductWish> => {
  const response = await client.get(`/api/products/${productId}/wish`);
  return response.data.data; 
};

export const toggleProductWish = async (productId: string): Promise<{ success: boolean }> => {
  const response = await client.post(`/api/products/${productId}/wish`);
  return response.data;
};

export const getProductSummary = async (productId: string) => {
  const response = await client.get(`/api/products/${productId}/summary`);
  return response.data.data;
};

export const login = async (email: string, password: string) => {
  const response = await client.post('/api/login', { email, password });
  return response.data.data;
};

export const createOrder = async (orderData: any) => {
  const response = await client.post('/api/order', orderData);
  return response.data.data;
};

export const getThemeInfo = async (themeId: string) => {
  const response = await client.get(`/api/themes/${themeId}/info`);
  return response.data.data;
};

export const getThemeProducts = async (themeId: string, cursor?: number) => {
  const response = await client.get(`/api/themes/${themeId}/products`, {
    params: { cursor },
  });
  return response.data.data;
};
