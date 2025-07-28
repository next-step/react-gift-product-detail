import { apiRequest } from './apiClient';
import type { Product, ProductRankingResponse, ProductSummary, ProductSummaryResponse } from '../types/product';

export const fetchProductRanking = async (
  targetType: string = 'ALL',
  rankType: string = 'MANY_WISH'
): Promise<Product[]> => {
  const result = await apiRequest<ProductRankingResponse>(
    `/products/ranking?targetType=${targetType}&rankType=${rankType}`,
    { method: 'GET' }
  );
  return result.data;
};

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const result = await apiRequest<ProductSummaryResponse>(
    `/products/${productId}/summary`,
    { method: 'GET' }
  );
  return result.data;
};

export const fetchProductBasic = async (productId) => {
  const result = await apiRequest(
    `/products/${productId}`,
    { method: 'GET' }
  );
  return result.data;
};

export const fetchProductDetail = async (productId) => {
  const result = await apiRequest(
    `/products/${productId}/detail`,
    { method: 'GET' }
  );
  return result.data;
};

// 상품 찜 정보 조회
export const fetchProductWish = async (productId) => {
  const result = await apiRequest(
    `/products/${productId}/wish`,
    { method: 'GET' }
  );
  return result.data;
};

// 상품 하이라이트 리뷰 조회
export const fetchProductHighlightReview = async (productId) => {
  const result = await apiRequest(
    `/products/${productId}/highlight-review`,
    { method: 'GET' }
  );
  return result.data;
};