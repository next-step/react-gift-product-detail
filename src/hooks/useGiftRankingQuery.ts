import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGiftRanking, type GiftProduct } from '@/apis/fetchGiftRanking';

export function useGiftRankingQuery(targetType: string, rankType: string) {
  return useSuspenseQuery<GiftProduct[], Error>({
    queryKey: ['giftRanking', targetType, rankType],
    queryFn: () => fetchGiftRanking(targetType, rankType),
  });
}
