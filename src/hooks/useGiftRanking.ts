import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/api/RankingApi';

const giftRankingQueryOptions = (gender: string, type: string) =>
  queryOptions({
    queryKey: ['ranking', gender, type],
    queryFn: () => fetchRanking(gender, type),
    staleTime: 1000 * 60,
    enabled: !!gender && !!type,
  });

export default function useGiftRanking(gender: string, type: string) {
  return useQuery(giftRankingQueryOptions(gender, type));
}
