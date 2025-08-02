import { apiClient } from './apiClient';
import type {
  ProductInfo,
  RankingApiProps,
  ProductSummaryData,
  ProductDetailData,
  ProductWishData,
  ProductReviewData,
} from '@/types';

export const productRequests = {
  fetchSummary: (index: number): Promise<ProductSummaryData> => {
    return apiClient.get(`/api/products/${index}/summary`);
  },
  fetchRanking: ({ activeGeneration, activeFilter }: RankingApiProps): Promise<ProductInfo[]> => {
    return apiClient.get(
      `/api/products/ranking?targetType=${activeGeneration}&rankType=${activeFilter}`
    );
  },
  fetchProduct: (index: number): Promise<ProductInfo> => apiClient.get(`/api/products/${index}`),
  fetchProductDetail: (index: number): Promise<ProductDetailData> =>
    apiClient.get(`/api/products/${index}/detail`),
  fetchProductReview: (index: number): Promise<ProductReviewData> =>
    apiClient.get(`/api/products/${index}/highlight-review`),
  fetchProductWish: (index: number): Promise<ProductWishData> =>
    apiClient.get(`/api/products/${index}/wish`),
};
