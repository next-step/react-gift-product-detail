import { useQuery } from '@tanstack/react-query';
import { getProductSummary, getRankingProducts } from './apis';
import type {
  ProductSummary,
  RankingResponse,
  TargetType,
  RankType,
} from '../types';

/**
 * 특정 상품의 요약 정보를 가져오는 커스텀 훅 (React Query 적용)
 * @param productId - 상품 ID
 */
export const useProduct = (productId: string | number | undefined) => {
  return useQuery<ProductSummary | null, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () =>
      productId ? getProductSummary(String(productId)) : Promise.resolve(null),
    enabled: !!productId,
  });
};

/**
 * 실시간 급상승 선물 랭킹을 조회하는 커스텀 훅 (React Query 적용)
 * @param targetType - 대상 타입
 * @param rankType - 랭킹 타입
 */
export const useRankingProducts = (
  targetType: TargetType = 'ALL',
  rankType: RankType = 'MANY_WISH'
) => {
  return useQuery<RankingResponse, Error>({
    queryKey: ['rankingProducts', targetType, rankType],
    queryFn: () => getRankingProducts(targetType, rankType),
  });
};

// 상품 상세 관련 훅들
import {
  getProductById,
  getProductDetail,
  getProductWish,
  getProductHighlightReview,
} from './apis';
import type {
  ProductResponse,
  ProductDetailResponse,
  ProductWishResponse,
  ProductHighlightReviewResponse,
} from '../types';

/**
 * 상품 기본 정보를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProductBasic = (productId: string | number | undefined) => {
  return useQuery<ProductResponse | null, Error>({
    queryKey: ['productBasic', productId],
    queryFn: () =>
      productId ? getProductById(String(productId)) : Promise.resolve(null),
    enabled: !!productId,
  });
};

/**
 * 상품 상세 정보를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProductDetail = (productId: string | number | undefined) => {
  return useQuery<ProductDetailResponse | null, Error>({
    queryKey: ['productDetail', productId],
    queryFn: () =>
      productId ? getProductDetail(String(productId)) : Promise.resolve(null),
    enabled: !!productId,
  });
};

/**
 * 상품 찜 정보를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProductWish = (productId: string | number | undefined) => {
  return useQuery<ProductWishResponse | null, Error>({
    queryKey: ['productWish', productId],
    queryFn: () =>
      productId ? getProductWish(String(productId)) : Promise.resolve(null),
    enabled: !!productId,
  });
};

/**
 * 상품 하이라이트 리뷰를 가져오는 커스텀 훅
 * @param productId - 상품 ID
 */
export const useProductHighlightReview = (
  productId: string | number | undefined
) => {
  return useQuery<ProductHighlightReviewResponse | null, Error>({
    queryKey: ['productHighlightReview', productId],
    queryFn: () =>
      productId
        ? getProductHighlightReview(String(productId))
        : Promise.resolve(null),
    enabled: !!productId,
  });
};
