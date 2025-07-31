import { requests } from '@/api/requests';
import type { ProductInfo, RankingApiProps } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useRanking = ({ activeGeneration, activeFilter }: RankingApiProps) => {
  const { data } = useSuspenseQuery<ProductInfo[]>({
    queryKey: ['rankDatas', activeGeneration, activeFilter],
    queryFn: () => requests.fetchRanking({ activeGeneration, activeFilter }),
  });

  return { data };
};

export default useRanking;
