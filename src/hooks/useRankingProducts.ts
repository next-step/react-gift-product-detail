import { useQuery } from '@tanstack/react-query';
import { getRankingProducts } from '../api/products';
import type { RankingResponse, TargetType, RankType } from '../api/types';

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
