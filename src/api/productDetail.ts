import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  ProductInfo, 
  ProductDetail, 
  ProductHighlightReview, 
  ProductWish,
  ProductInfoResponse,
  ProductDetailResponse,
  ProductHighlightReviewResponse,
  ProductWishResponse
} from "../types/productDetail";

// 1. 상품 정보 API
export const fetchProductInfo = async (productId: number): Promise<ProductInfo> => {
  const response = await fetch(`/api/products/${productId}`);
  const result: ProductInfoResponse = await response.json();
  console.log(`[API] /api/products/${productId} 응답:`, result);

  if (!response.ok) {
    throw new Error(result.data?.toString() || "상품 정보를 불러오는데 실패했습니다.");
  }

  return result.data;
};

// 2. 상품 세부 정보 API
export const fetchProductDetail = async (productId: number): Promise<ProductDetail> => {
  const response = await fetch(`/api/products/${productId}/detail`);
  const result: ProductDetailResponse = await response.json();
  console.log(`[API] /api/products/${productId}/detail 응답:`, result);

  if (!response.ok) {
    throw new Error(result.data?.toString() || "상품 세부 정보를 불러오는데 실패했습니다.");
  }

  return result.data;
};

// 3. 상품 주요 리뷰 API
export const fetchProductHighlightReview = async (productId: number): Promise<ProductHighlightReview> => {
  const response = await fetch(`/api/products/${productId}/highlight-review`);
  const result: ProductHighlightReviewResponse = await response.json();
  console.log(`[API] /api/products/${productId}/highlight-review 응답:`, result);

  if (!response.ok) {
    throw new Error(result.data?.toString() || "상품 리뷰를 불러오는데 실패했습니다.");
  }

  return result.data;
};

// 4. 상품 관심 등록 수 API
export const fetchProductWish = async (productId: number): Promise<ProductWish> => {
  const response = await fetch(`/api/products/${productId}/wish`);
  const result: ProductWishResponse = await response.json();
  console.log(`[API] /api/products/${productId}/wish 응답:`, result);

  if (!response.ok) {
    throw new Error(result.data?.toString() || "상품 관심 정보를 불러오는데 실패했습니다.");
  }

  return result.data;
};

// React Query Hooks
export const useProductInfo = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'info', productId],
    queryFn: () => fetchProductInfo(productId),
    enabled: !!productId,
  });
};

export const useProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
  });
};

export const useProductHighlightReview = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'highlight-review', productId],
    queryFn: () => fetchProductHighlightReview(productId),
    enabled: !!productId,
  });
};

export const useProductWish = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'wish', productId],
    queryFn: () => fetchProductWish(productId),
    enabled: !!productId,
  });
};

// 관심 등록/해제 Mutation (낙관적 업데이트용)
export const useToggleWish = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 실제 API 호출은 없지만, 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onMutate: async () => {
      // 낙관적 업데이트를 위해 이전 데이터 백업
      await queryClient.cancelQueries({ queryKey: ['product', 'wish', productId] });
      const previousWish = queryClient.getQueryData(['product', 'wish', productId]);

      // 낙관적 업데이트
      queryClient.setQueryData(['product', 'wish', productId], (old: ProductWish | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isWished: !old.isWished,
          wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
        };
      });

      return { previousWish };
    },
    onError: (_err, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousWish) {
        queryClient.setQueryData(['product', 'wish', productId], context.previousWish);
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['product', 'wish', productId] });
    },
  });
}; 