import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { ProductInfo, ProductDetail, ProductHighlightReview, ProductWish, ProductInfoResponse, ProductDetailResponse, ProductHighlightReviewResponse, ProductWishResponse } from "../types/productDetail";

export const fetchProductInfo = async (productId: number): Promise<ProductInfo> => {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  const data: ProductInfoResponse = await response.json();
  return data.data;
};

export const fetchProductDetail = async (productId: number): Promise<ProductDetail> => {
  const response = await fetch(`/api/products/${productId}/detail`);
  if (!response.ok) {
    throw new Error('상품 상세 정보를 불러오는데 실패했습니다.');
  }
  const data: ProductDetailResponse = await response.json();
  return data.data;
};

export const fetchProductHighlightReview = async (productId: number): Promise<ProductHighlightReview> => {
  const response = await fetch(`/api/products/${productId}/highlight-review`);
  if (!response.ok) {
    throw new Error('상품 리뷰를 불러오는데 실패했습니다.');
  }
  const data: ProductHighlightReviewResponse = await response.json();
  return data.data;
};

export const fetchProductWish = async (productId: number): Promise<ProductWish> => {
  const response = await fetch(`/api/products/${productId}/wish`);
  if (!response.ok) {
    throw new Error('상품 찜 정보를 불러오는데 실패했습니다.');
  }
  const data: ProductWishResponse = await response.json();
  return data.data;
};

// 기존 useQuery 훅들 (필요시 사용)
export const useProductInfo = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'info', productId],
    queryFn: () => fetchProductInfo(productId),
    enabled: productId > 0,
  });
};

export const useProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: productId > 0,
  });
};

export const useProductHighlightReview = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'highlight-review', productId],
    queryFn: () => fetchProductHighlightReview(productId),
    enabled: productId > 0,
  });
};

export const useProductWish = (productId: number) => {
  return useQuery({
    queryKey: ['product', 'wish', productId],
    queryFn: () => fetchProductWish(productId),
    enabled: productId > 0,
  });
};

// Suspense용 훅들
export const useSuspenseProductInfo = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'info', productId],
    queryFn: () => fetchProductInfo(productId),
  });
};

export const useSuspenseProductDetail = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
};

export const useSuspenseProductHighlightReview = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'highlight-review', productId],
    queryFn: () => fetchProductHighlightReview(productId),
  });
};

export const useSuspenseProductWish = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['product', 'wish', productId],
    queryFn: () => fetchProductWish(productId),
  });
};

export const useToggleWish = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onMutate: async () => {
      // 이전 데이터 백업
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
      // 에러 시 이전 데이터로 롤백
      if (context?.previousWish) {
        queryClient.setQueryData(['product', 'wish', productId], context.previousWish);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['product', 'wish', productId] });
    },
  });
}; 