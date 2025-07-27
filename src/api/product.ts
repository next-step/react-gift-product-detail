import type { ProductSummary, ProductError } from "../types/product";
import { useQuery } from "@tanstack/react-query";

// 기존 API 함수 (React Query hook에서 사용)
export const fetchProductSummary = async (
  productId: number,
): Promise<ProductSummary> => {
  const response = await fetch(`/api/products/${productId}/summary`);
  const result = await response.json();
  console.log(`[API] /api/products/${productId}/summary 응답:`, result);

  if (!response.ok) {
    const error: ProductError = {
      message: result.message || "제품 정보를 불러오는데 실패했습니다.",
      status: response.status,
    };
    throw error;
  }

  // 실제 상품 정보는 result.data에 있음
  return result.data;
};

// React Query Hook
export const useProductSummary = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'summary', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
  });
};
