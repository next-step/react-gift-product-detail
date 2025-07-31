import { useQuery } from '@tanstack/react-query';
import { getProductInfo } from '@/Api/api';
import { queryKeys } from './queryKeys';
import type { ProductItem } from '@/Api/api';

export const useProduct = (productId: number | null | undefined) =>
  useQuery<ProductItem>({
    queryKey: queryKeys.product(productId as number), // key 고정
    queryFn: () => getProductInfo(productId as number), // 네트워크 요청
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
