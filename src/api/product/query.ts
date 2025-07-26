import { useQuery } from '@tanstack/react-query';
import { getProductSummary, getRankingProducts } from './apis';
import type { RankingResponse, TargetType, RankType } from '../types';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

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
