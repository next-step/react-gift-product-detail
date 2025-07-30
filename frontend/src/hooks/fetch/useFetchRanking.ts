import { RANKING_URL } from '@/api/api.ts';
import useFetchData from '@/hooks/fetch/useFetchData.ts';
import type { Product } from '@/types/products/types.ts';

export default function useFetchRanking(targetType: string, rankType: string) {
  const { data } = useFetchData<Product>(['ranking', targetType, rankType], RANKING_URL, {
    targetType,
    rankType,
  });

  return {
    ranking: data?.data,
  };
}
