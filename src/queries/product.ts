import { fetchProductSummury } from '@apis/giftOrderApi';
import {
  fetchProduct,
  fetchProductDetailInfo,
  fetchProductReviews,
  fetchProductWishInfo,
} from '@apis/productApi';
import { fetchRankedProducts } from '@apis/rankingApi';
import { queryOptions } from '@tanstack/react-query';
import type { ProductId } from 'src/types/product';

export const RankedProductsOptions = (
  apiTargetType: string,
  apiRankType: string
) => {
  return queryOptions({
    queryKey: ['RankedProducts', apiTargetType, apiRankType],
    queryFn: () => fetchRankedProducts(apiTargetType, apiRankType),
  });
};

export const productSummaryOptions = (id: ProductId) => {
  return queryOptions({
    queryKey: ['productSummary', id],
    queryFn: ({ queryKey }) => fetchProductSummury(queryKey[1]),
  });
};

export const productOptions = (id: ProductId) => {
  return queryOptions({
    queryKey: ['product', id],
    queryFn: ({ queryKey }) => fetchProduct(queryKey[1]),
  });
};

export const productReviewOptions = (id: ProductId) => {
  return queryOptions({
    queryKey: ['productReviews', id],
    queryFn: ({ queryKey }) => fetchProductReviews(queryKey[1]),
  });
};

export const productWishOptions = (id: ProductId) => {
  return queryOptions({
    queryKey: ['wishInfo', id] as const,
    queryFn: ({ queryKey }) => fetchProductWishInfo(queryKey[1]),
  });
};

export const productDetailOptions = (id: ProductId) => {
  return queryOptions({
    queryKey: ['detailInfo', id],
    queryFn: ({ queryKey }) => fetchProductDetailInfo(queryKey[1]),
  });
};
