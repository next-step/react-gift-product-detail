import { requests } from '@/api/requests';
import type { GiftRankingItem, RankingApiProps } from '@/types';
import { useEffect, useState } from 'react';

const useRanking = ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const [rankingDatas, setRankingDatas] = useState<GiftRankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await requests.fetchRanking({ activeGenerationButton, activeFilterButton });
        setRankingDatas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeGenerationButton, activeFilterButton]);

  return { rankingDatas, loading };
};

export default useRanking;
