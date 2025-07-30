import { getFetch } from '@src/api/getBasicFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Goods } from '@src/types/Goods';
import { useQuery } from '@tanstack/react-query';

export const useRankingItem = ({
  targetType,
  rankType,
}: {
  targetType: string | null;
  rankType: string | null;
}) => {
  const { data, isError, isLoading } = useQuery<Goods>({
    queryKey: ['ranking', { targetType, rankType }],
    queryFn: () =>
      getFetch<Goods>(BASIC_ENDPOINT.ranking, {
        targetType,
        rankType,
      }),
  });
  console.log(data);
  return { data: { data: data?.data ?? [] } as Goods, isError, isLoading };
};
