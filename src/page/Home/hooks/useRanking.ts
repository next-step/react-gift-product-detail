import { requests } from '@/api/requests';
import type { GiftRankingItem, RankingApiProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useRanking = ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const { data, isLoading } = useQuery<GiftRankingItem[]>({
    queryKey: ['rankDatas', activeGenerationButton, activeFilterButton],
    queryFn: () => requests.fetchRanking({ activeGenerationButton, activeFilterButton }),
  });

  return { rankingDatas: data, isLoading };
};

export default useRanking;
