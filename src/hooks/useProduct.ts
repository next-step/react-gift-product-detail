import { useQuery } from '@tanstack/react-query';
import { getProductSummary } from '@/api/products';

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

/**
 * 특정 상품의 요약 정보를 가져오는 커스텀 훅 (React Query 적용)
 * @param productId - 상품 ID
 */
export const useProduct = (productId: string | number | undefined) => {
  return useQuery<ProductSummary | null, Error>({
    queryKey: ['productSummary', productId],
    queryFn: () =>
      productId ? getProductSummary(String(productId)) : Promise.resolve(null),
    enabled: !!productId,
  });
};
