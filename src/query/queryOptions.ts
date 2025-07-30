import { queryOptions } from '@tanstack/react-query';
import { fetchGiftRanking } from '../api/giftRanking';
import { fetchGiftThemes } from '../api/giftTheme';
import {
  fetchProdcutInfo,
  fetchProductDetail,
} from '../api/productInfo';
import { fetchProductReview } from '../api/productReview';
import { fetchProductWish } from '../api/productWish';

import { fetchThemeInfo } from '../api/themeInfo';
import { queryKeys } from '../constants/queryKeys';
import { fetchGiftProductById } from '../hooks/useGiftProductById';

export const giftProductQueryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.giftProduct(id),
    queryFn: () => fetchGiftProductById(id),
    enabled: !!id,
  });

export const giftRankingQueryOptions = (
  filter: string,
  tab: string
) =>
  queryOptions({
    queryKey: queryKeys.giftRanking(filter, tab),
    queryFn: () => fetchGiftRanking(filter, tab),
  });

export const giftThemesQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.giftThemes,
    queryFn: async () => {
      const res = await fetchGiftThemes();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const giftThemeInfoQueryOptions = (themeId: number) =>
  queryOptions({
    queryKey: queryKeys.themeInfo(themeId),
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const ProductDetailQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: queryKeys.productInfo(productId),
    queryFn: async () => {
      const res = await fetchProdcutInfo(productId);
      return res;
    },
  });

export const ProductDescriptionQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: queryKeys.productDescription(productId),
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
  });

export const ProductReviewQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: queryKeys.productReview(productId),
    queryFn: () => fetchProductReview(productId),
    enabled: !!productId,
  });

export const ProductWishQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: queryKeys.productWish(productId),
    queryFn: () => fetchProductWish(productId),
    enabled: !!productId,
  });
