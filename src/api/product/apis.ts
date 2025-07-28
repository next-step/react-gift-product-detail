import apiClient from '../index';
import type {
  RankingResponse,
  TargetType,
  RankType,
  ProductResponse,
  ProductDetailResponse,
  ProductWishResponse,
  ProductHighlightReviewResponse,
} from '../types';
import axios from 'axios';

/**
 * 실시간 급상승 선물 랭킹을 조회합니다.
 * @param targetType - 대상 타입 (ALL, FEMALE, MALE, TEEN)
 * @param rankType - 랭킹 타입 (MANY_WISH, MANY_RECEIVE, MANY_WISH_RECEIVE)
 */
export const getRankingProducts = async (
  targetType: TargetType = 'ALL',
  rankType: RankType = 'MANY_WISH'
): Promise<RankingResponse> => {
  const response = await apiClient.get<RankingResponse>(
    '/api/products/ranking',
    {
      params: { targetType, rankType },
    }
  );
  return response.data;
};

/**
 * 특정 상품의 상세 정보를 조회합니다.
 * @param productId - 상품 ID
 */
export const getProductById = async (
  productId: string | number
): Promise<ProductResponse> => {
  const response = await apiClient.get<ProductResponse>(
    `/api/products/${productId}`
  );
  return response.data;
};

const baseURL = import.meta.env.VITE_API_BASE_URL;
export async function getProductSummary(productId: string) {
  const response = await axios.get(
    `${baseURL}/api/products/${productId}/summary`
  );
  return response.data.data;
}

/**
 * 상품 상세 정보를 조회합니다.
 * @param productId - 상품 ID
 */
export const getProductDetail = async (
  productId: string | number
): Promise<ProductDetailResponse> => {
  const response = await apiClient.get<ProductDetailResponse>(
    `/api/products/${productId}/detail`
  );
  return response.data;
};

/**
 * 상품 찜 정보를 조회합니다.
 * @param productId - 상품 ID
 */
export const getProductWish = async (
  productId: string | number
): Promise<ProductWishResponse> => {
  const response = await apiClient.get<ProductWishResponse>(
    `/api/products/${productId}/wish`
  );
  return response.data;
};

/**
 * 상품 하이라이트 리뷰를 조회합니다.
 * @param productId - 상품 ID
 */
export const getProductHighlightReview = async (
  productId: string | number
): Promise<ProductHighlightReviewResponse> => {
  const response = await apiClient.get<ProductHighlightReviewResponse>(
    `/api/products/${productId}/highlight-review`
  );
  return response.data;
};

/**
 * 상품 찜을 토글합니다.
 * @param productId - 상품 ID
 */
export const toggleWish = async (
  productId: string | number
): Promise<{ success: boolean }> => {
  // 실제 API가 없으므로 시뮬레이션
  // 실제로는 POST/PUT 요청을 보내야 함
  console.log(`상품 ${productId} 찜 토글 요청`);
  await new Promise((resolve) => setTimeout(resolve, 100)); // 0.1초 지연 시뮬레이션

  return { success: true };
};
