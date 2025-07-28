import { useQuery } from '@tanstack/react-query';
import {
  fetchProductBasic,
  fetchProductDetail,
  fetchProductWish,
  fetchProductHighlightReview
} from '@/api/productApi';

export function useProductBasicQuery(productId) {
  return useQuery({
    queryKey: ['productBasic', productId],
    queryFn: () => fetchProductBasic(productId),
    enabled: !!productId,
  });
}

export function useProductDetailQuery(productId) {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
  });
}

export function useProductWishQuery(productId) {
  return useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
    enabled: !!productId,
  });
}

export function useProductHighlightReviewQuery(productId) {
  return useQuery({
    queryKey: ['productHighlightReview', productId],
    queryFn: () => fetchProductHighlightReview(productId),
    enabled: !!productId,
  });
}
