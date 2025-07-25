import { useQuery } from '@tanstack/react-query';
import type { GiftItem } from '../types/GiftItem';
import { giftRankingQueryOptions } from '../query/queryOptions';

export const useGiftRanking = (filter: string, tab: string) => {
  return useQuery<GiftItem[], Error>(
    giftRankingQueryOptions(filter, tab)
  );
};
