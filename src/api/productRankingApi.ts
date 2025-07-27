import API from './axiosInstance';
import type { ProductRanking } from '@/types/giftRankingTheme';

export const fetchProductRankings = async (
  rankType: string = 'POPULAR',
  targetType?: string
): Promise<ProductRanking[]> => {
  const params = new URLSearchParams();
  params.append('rankType', rankType);
  if (targetType && targetType !== 'ALL') {
    params.append('targetType', targetType);
  }

  const res = await API.get(`/api/products/ranking?${params.toString()}`);
  return res.data.data;
};
