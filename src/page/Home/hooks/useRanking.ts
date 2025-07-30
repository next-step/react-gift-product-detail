import { requests } from '@/api/requests';
import type { GiftRankingItem, RankingApiProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useRanking = ({ activeGeneration, activeFilter }: RankingApiProps) => {
  const { data, isLoading } = useQuery<GiftRankingItem[]>({
    queryKey: ['rankDatas', activeGeneration, activeFilter],
    queryFn: () => requests.fetchRanking({ activeGeneration, activeFilter }),
  });

  return { rankingDatas: data, isLoading };
};

export default useRanking;
