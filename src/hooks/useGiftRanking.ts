import { useQuery } from '@tanstack/react-query';
import { giftRankingQueryOptions } from '../query/queryOptions';

export const useGiftRanking = (filter: string, tab: string) => {
  return useQuery(giftRankingQueryOptions(filter, tab));
};
