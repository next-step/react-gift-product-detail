import type { Product } from '@/types/Product';

export async function fetchProductInfo(productId: string): Promise<Product> {
  const res = await fetch(`/api/products/${productId}`);

  if (!res.ok) {
    throw new Error('상품 정보를 불러오지 못했습니다.');
  }

  const json = await res.json();
  console.log('[상품 정보 응답]', json);
  return json.data;
}
