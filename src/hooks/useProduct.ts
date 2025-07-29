import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProductDetail,
  fetchProductInfo,
  fetchHighlightReview,
  fetchWishCount,
} from '@/api/productApi';
import { QUERY_KEYS } from '@/constants/queryKeys';

import type {
  ProductInfo,
  ProductDetail,
  HighlightReviewResponse,
  WishResponse,
} from '@/types/product';

export const useProductInfo = (productId: number) => {
  return useSuspenseQuery<ProductInfo>({
    queryKey: QUERY_KEYS.productInfo(productId),
    queryFn: () => fetchProductInfo(productId),
  });
};

export const useProductDetail = (productId: number) => {
  return useSuspenseQuery<ProductDetail>({
    queryKey: QUERY_KEYS.productDetail(productId),
    queryFn: () => fetchProductDetail(productId),
  });
};

export const useHighlightReview = (productId: number) => {
  return useSuspenseQuery<HighlightReviewResponse>({
    queryKey: QUERY_KEYS.productHighlightReview(productId),
    queryFn: () => fetchHighlightReview(productId),
  });
};

export const useWishCount = (productId: number) => {
  return useSuspenseQuery<WishResponse>({
    queryKey: QUERY_KEYS.wishCount(productId),
    queryFn: () => fetchWishCount(productId),
  });
};

export const useToggleWish = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return; 
    },
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.wishCount(productId), (prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          isWished: !prev.isWished,
          wishCount: prev.isWished ? prev.wishCount - 1 : prev.wishCount + 1,
        };
      });
    },
  });
};
