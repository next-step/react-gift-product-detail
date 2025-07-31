import { useQuery } from '@tanstack/react-query';
import { getProductDetailInfo, type ProductDetailInfo } from '@/Api/api';
import { queryKeys } from './queryKeys';

export const useProductDetail = (productId: number | null | undefined) =>
  useQuery<ProductDetailInfo>({
    queryKey: queryKeys.productDetail(productId as number),
    queryFn: () => getProductDetailInfo(productId as number),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
