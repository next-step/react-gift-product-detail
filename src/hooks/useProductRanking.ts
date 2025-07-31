// src/hooks/useProductRanking.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ProductData, ProductRankingFilterOption } from '@/types/products';

export function useProductRanking(filter: ProductRankingFilterOption) {
  return useQuery<ProductData[], Error>({
    queryKey: ['productRanking', filter],
    queryFn: () =>
      axios
        .get<{ data: ProductData[] }>('/api/products/ranking', { params: filter })
        .then(res => res.data.data),
    staleTime: 1000 * 30,          // 30초 동안은 서버 재요청 생략
    refetchInterval: 1000 * 60,    // 1분마다 자동 리패칭
  });
}
