import { getBasicFetch } from '@src/api/getBasicFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useQuery } from '@tanstack/react-query';

export const useRankingItem = ({
  targetType,
  rankType,
}: {
  targetType: string | null;
  rankType: string | null;
}) => {
  const { data, isError, isLoading } = useQuery<Good[]>({
    queryKey: ['ranking', { targetType, rankType }],
    queryFn: () => getBasicFetch<Good[]>(BASIC_ENDPOINT.ranking),
    params: {
      targetType,
      rankType,
    },
    enabled: !!targetType && !!rankType,
  });
  return { data, isError, isLoading };
};
