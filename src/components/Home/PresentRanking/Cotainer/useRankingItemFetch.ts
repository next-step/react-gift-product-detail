import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useApiQuery } from '@src/api/useApiQuery';

export const useRankingItemFetch = ({
  targetType,
  rankType,
}: {
  targetType: string | null;
  rankType: string | null;
}) => {
  return useApiQuery<Good[]>({
    endpoint: BASIC_ENDPOINT.ranking,
    queryKey: ['ranking', { targetType, rankType }],
    params: {
      targetType,
      rankType,
    },
    enabled: !!targetType && !!rankType,
  });
};
