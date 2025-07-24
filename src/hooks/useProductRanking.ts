import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/product';
import { PRODUCT_RANKING_API_URL } from './constants/api';

const fetchProductRankings = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const res = await axios.get<{ data: Product[] }>(PRODUCT_RANKING_API_URL, {
    params: { targetType, rankType },
  });
  return res.data.data;
};

export const useProductRanking = (targetType: string, rankType: string) => {
  return useQuery<Product[]>({
    queryKey: ['productRanking', targetType, rankType],
    queryFn: () => fetchProductRankings(targetType, rankType),
  });
};
