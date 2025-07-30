import { useQuery } from '@tanstack/react-query';
import { getRanking } from '@/api/services';
import type { GenderFilter, SortFilter } from '@/components/RankingTabs';

export const useRankingQuery = (gender: GenderFilter, sort: SortFilter) => {
  return useQuery({
    queryKey: ['ranking', gender, sort],
    queryFn: () => getRanking(gender, sort),
  });
};
