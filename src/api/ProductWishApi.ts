export async function fetchWishInfo(productId: number) {
  const res = await fetch(`/api/products/${productId}/wish`);
  if (!res.ok) throw new Error('찜 정보를 불러올 수 없습니다.');
  const json = await res.json();
  return json.data as { wishCount: number; isWished: boolean };
}
