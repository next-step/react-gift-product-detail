import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchProductRanking,
  fetchProductSummary,
  fetchThemeProducts,
  fetchProduct,
  fetchProductDetail,
  fetchProductWish,
  fetchProductReviews,
} from '@/api/product';

export const useProductRanking = (targetType: string, rankType: string) => {
  return useQuery({
    queryKey: ['productRanking', targetType, rankType],
    queryFn: () => fetchProductRanking(targetType, rankType),
  });
};

export const useProductSummary = (productId: number) => {
  return useQuery({
    queryKey: ['productSummary', productId],
    queryFn: () => fetchProductSummary(productId),
    enabled: !!productId,
  });
};

export const useThemeProductsInfinite = (themeId: number, limit = 20) => {
  return useInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts({ themeId, cursor: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasMoreList ? lastPage.cursor : undefined),
    enabled: !!themeId,
  });
};

export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });
};

export const useProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
  });
};

export const useProductWish = (productId: number) => {
  return useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
    enabled: !!productId,
  });
};

export const useProductReviews = (productId: number) => {
  return useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => fetchProductReviews(productId),
    enabled: !!productId,
  });
};
