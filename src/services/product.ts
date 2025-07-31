import { api } from './api';
import type { GetRankingProductsResponse, Product } from '@/types/product';

export const getProductSummary = async (productId: number): Promise<Product> => {
  const response = await api.get(`/products/${productId}/summary`);
  const summaryData = response.data.data;

  return {
    ...summaryData,
    price: {
      sellingPrice: summaryData.price,
      basicPrice: summaryData.price,
      discountRate: 0,
    },
  };
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
