import { useSuspenseQuery } from '@tanstack/react-query';
import {
  fetchProductBasic,
  fetchProductDetail,
  fetchProductWish,
  fetchProductHighlightReview
} from '@/api/productApi';


export function useProductBasicQuery(productId: any): any {
  return useSuspenseQuery({
    queryKey: ['productBasic', productId],
    queryFn: () => fetchProductBasic(productId),
  });
}


export function useProductDetailQuery(productId: any): any {
  return useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
}


export function useProductWishQuery(productId: any): any {
  return useSuspenseQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
  });
}


export function useProductHighlightReviewQuery(productId: any): any {
  return useSuspenseQuery({
    queryKey: ['productHighlightReview', productId],
    queryFn: () => fetchProductHighlightReview(productId),
  });
}
