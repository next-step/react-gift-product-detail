import { requests } from '@/api/requests';
import type { ProductInfo, RankingApiProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useRanking = ({ activeGeneration, activeFilter }: RankingApiProps) => {
  const { data, isLoading } = useQuery<ProductInfo[]>({
    queryKey: ['rankDatas', activeGeneration, activeFilter],
    queryFn: () => requests.fetchRanking({ activeGeneration, activeFilter }),
  });

  return { data, isLoading };
};

export default useRanking;
