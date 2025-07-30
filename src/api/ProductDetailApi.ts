import type { ProductDetail, ProductReview } from '@/types/Product';

export async function fetchProductDetail(productId: string): Promise<ProductDetail> {
  const res = await fetch(`/api/products/${productId}/detail`);
  if (!res.ok) {
    throw new Error('상품 상세 정보를 불러오지 못했습니다.');
  }
  const json = await res.json();
  console.log('[상품 상세 응답]', json);
  return json.data;
}

export async function fetchHighlightReviews(productId: string): Promise<ProductReview> {
  const res = await fetch(`/api/products/${productId}/highlight-review`);
  if (!res.ok) {
    throw new Error('상품 리뷰를 불러오지 못했습니다.');
  }
  const json = await res.json();
  return json.data;
}
