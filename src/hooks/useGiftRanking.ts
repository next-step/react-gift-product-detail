import { useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/api/RankingApi';
import type { Product } from '@/types/Product';

export default function useGiftRanking(gender: string, type: string) {
  return useQuery<Product[], Error>({
    queryKey: ['ranking', gender, type],
    queryFn: () => fetchRanking(gender, type),
    staleTime: 1000 * 60,
    enabled: !!gender && !!type,
  });
}
