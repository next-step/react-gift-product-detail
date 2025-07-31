import { useQuery } from '@tanstack/react-query';
import { getWishInfo, type WishInfo } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useWishInfo = (productId: number | null | undefined) =>
  useQuery<WishInfo>({
    queryKey: queryKeys.productWish(productId as number),
    queryFn: () => getWishInfo(productId as number),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
