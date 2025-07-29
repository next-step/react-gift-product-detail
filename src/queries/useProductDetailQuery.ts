import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getProduct,
  getProductDetail,
  getProductHighlightReview,
  getWishInfo,
} from '@/apis/product';
import type { Product, ProductDetail, ProductReviewResponse, WishInfo } from '@/apis/product';

export function useProductQuery(productId: number) {
  return useSuspenseQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
  });
}

export function useProductDetailQuery(productId: number) {
  return useSuspenseQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
  });
}

export function useProductReviewQuery(productId: number) {
  return useSuspenseQuery<ProductReviewResponse>({
    queryKey: ['productReview', productId],
    queryFn: () => getProductHighlightReview(productId),
  });
}

export function useProductWishQuery(productId: number) {
  return useSuspenseQuery<WishInfo>({
    queryKey: ['productWish', productId],
    queryFn: () => getWishInfo(productId),
  });
}
