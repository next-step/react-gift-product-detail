import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductDetail, fetchProductInfo, fetchHighlightReview } from '@/api/productApi';
import { QUERY_KEYS } from '@/constants/queryKeys';

import type { ProductInfo, ProductDetail ,HighlightReviewResponse,} from '@/types/product';

export const useProductInfo = (productId: number) => {
  return useSuspenseQuery<ProductInfo>({
    queryKey: QUERY_KEYS.productInfo(productId),
    queryFn: () => fetchProductInfo(productId),
  });
};

export const useProductDetail = (productId: number) => {
  return useSuspenseQuery<ProductDetail>({
    queryKey: QUERY_KEYS.productDetail(productId),
    queryFn: () => fetchProductDetail(productId),
  });
};


export const useHighlightReview = (productId: number) => {
  return useSuspenseQuery<HighlightReviewResponse>({
    queryKey: QUERY_KEYS.productHighlightReview(productId),
    queryFn: () => fetchHighlightReview(productId),
  });
};