import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchProductDetail } from '@/api/ProductDetailApi';
import { fetchHighlightReviews } from '@/api/ProductDetailApi';
import type { ProductDetail } from '@/types/Product';
import type { ProductReview } from '@/types/Product';

export function useProductDetail(productId: string) {
  return useSuspenseQuery<ProductDetail>({
    queryKey: ['product-detail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
}

export function useProductHighlightReview(productId: string) {
  return useSuspenseQuery<ProductReview>({
    queryKey: ['product-review', productId],
    queryFn: () => fetchHighlightReviews(productId),
  });
}
