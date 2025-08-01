import { useQueries } from '@tanstack/react-query';
import { getProduct, getProductDetail, getProductReview, getProductWish } from '@/services/product';
import { queryKeys } from '@/constants/queryKeys';

export const useProductAllData = (productId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: queryKeys.products.info(productId),
        queryFn: () => getProduct(productId),
        enabled: !!productId,
      },
      {
        queryKey: queryKeys.products.detail(productId),
        queryFn: () => getProductDetail(productId),
        enabled: !!productId,
      },
      {
        queryKey: queryKeys.products.review(productId),
        queryFn: () => getProductReview(productId),
        enabled: !!productId,
      },
      {
        queryKey: queryKeys.products.wish(productId),
        queryFn: () => getProductWish(productId),
        enabled: !!productId,
      },
    ],
  });
};