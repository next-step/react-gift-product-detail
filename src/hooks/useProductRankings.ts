import { useQuery } from '@tanstack/react-query';
import { fetchProductRankings } from '@/api/productRankingApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ProductRanking } from '@/types/giftRankingTheme';

export const useProductRankings = (category: string, gender: string) =>
  useQuery<ProductRanking[]>({
    queryKey: QUERY_KEYS.productRanking(category, gender),
    queryFn: () => fetchProductRankings(category.toUpperCase(), gender.toUpperCase()),
  });
