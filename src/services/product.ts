import { api } from './api';
import type {
  GetRankingProductsResponse,
  Product,
  ProductDetail,
  ProductReview,
  ProductSummary,
  ProductWish,
} from '@/types/product';

export const getProduct = async (productId: number): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  return response.data.data;
};

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const response = await api.get(`/products/${productId}/detail`);
  return response.data.data;
};

export const getProductReview = async (productId: number): Promise<ProductReview> => {
  const response = await api.get(`/products/${productId}/highlight-review`);
  return response.data.data;
};

export const getProductWish = async (productId: number): Promise<ProductWish> => {
  const response = await api.get(`/products/${productId}/wish`);
  return response.data.data;
};

export const getProductSummary = async (productId: number): Promise<ProductSummary> => {
  const response = await api.get(`/products/${productId}/summary`);
  return response.data.data;
};

export const getRankingProducts = async (targetType: string, rankType: string) => {
  const response = await api.get<GetRankingProductsResponse>('/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  });
  return response.data.data;
};
