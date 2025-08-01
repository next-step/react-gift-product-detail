import { useSuspenseQueries } from '@tanstack/react-query';
import { getProduct, getProductDetail, getProductReview, getProductWish } from '@/services/product';
import { queryKeys } from '@/constants/queryKeys';

export const useSuspenseProductAllData = (productId: number) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.products.info(productId),
        queryFn: () => getProduct(productId),
      },
      {
        queryKey: queryKeys.products.detail(productId),
        queryFn: () => getProductDetail(productId),
      },
      {
        queryKey: queryKeys.products.review(productId),
        queryFn: () => getProductReview(productId),
      },
      {
        queryKey: queryKeys.products.wish(productId),
        queryFn: () => getProductWish(productId),
      },
    ],
  });
};
