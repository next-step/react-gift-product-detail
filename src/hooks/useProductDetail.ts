import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail } from '@/api/ProductDetailApi';
import { fetchHighlightReviews } from '@/api/ProductDetailApi';
import type { ProductDetail } from '@/types/Product';
import type { ProductReview } from '@/types/Product';

export function useProductDetail(productId: string) {
  return useQuery<ProductDetail>({
    queryKey: ['product-detail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: productId != null,
  });
}

export function useProductHighlightReview(productId: string) {
  return useQuery<ProductReview>({
    queryKey: ['product-review', productId],
    queryFn: () => fetchHighlightReviews(productId),
    enabled: productId != null,
  });
}
