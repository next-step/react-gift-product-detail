import { getFetch } from '@src/api/getFetch';
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
  const { data, isError } = useSuspenseQuery<Goods>({
    queryKey: ['ranking', { targetType, rankType }],
    queryFn: () =>
      getFetch<Goods>(BASIC_ENDPOINT.ranking, {
        targetType,
        rankType,
      }),
  });
  return { data, isError };
};
