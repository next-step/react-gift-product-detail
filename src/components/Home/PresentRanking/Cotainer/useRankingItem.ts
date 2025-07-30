import { getBasicFetch } from '@src/api/getBasicFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Goods } from '@src/types/Goods';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useRankingItem = ({
  targetType,
  rankType,
}: {
  targetType: string | null;
  rankType: string | null;
}) => {
  const { data, isError, isLoading } = useSuspenseQuery<Goods>({
    queryKey: ['ranking', { targetType, rankType }],
    queryFn: () =>
      getBasicFetch<Goods>(BASIC_ENDPOINT.ranking, {
        targetType,
        rankType,
      }),
  });
  return { data, isError, isLoading };
};
