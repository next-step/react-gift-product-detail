import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductInfo } from '@/apis/productInfo';
import { fetchProductDetail } from '@/apis/productDetail';
import { fetchProductReview } from '@/apis/productReview';
import { fetchProductWish } from '@/apis/productWish';

import type { ProductInfo } from '@/types/productInfo';
import type { ProductDetail } from '@/types/productDetail';
import type { ProductReview } from '@/types/productReview';
import type { ProductWish } from '@/types/productWish';
import { QUERY_KEYS } from '@/constants/queryKey';

export const useProduct = (productId: number) => {
  const infoQuery = useSuspenseQuery<ProductInfo>({
    queryKey: QUERY_KEYS.productInfo(productId),
    queryFn: () => fetchProductInfo(productId),
    retry: false,
  });

  const detailQuery = useSuspenseQuery<ProductDetail>({
    queryKey: QUERY_KEYS.productDetail(productId),
    queryFn: () => fetchProductDetail(productId),
    retry: false,
  });

  const reviewQuery = useSuspenseQuery<ProductReview>({
    queryKey: QUERY_KEYS.productReview(productId),
    queryFn: () => fetchProductReview(productId),
    retry: false,
  });

  const wishQuery = useSuspenseQuery<ProductWish>({
    queryKey: QUERY_KEYS.productWish(productId),
    queryFn: () => fetchProductWish(productId),
    retry: false,
  });

  return {
    info: infoQuery.data,
    detail: detailQuery.data,
    review: reviewQuery.data,
    wish: wishQuery.data,
  };
};
