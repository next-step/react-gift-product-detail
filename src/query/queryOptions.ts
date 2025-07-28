import { fetchGiftRanking } from '../api/giftRanking';
import { fetchGiftThemes } from '../api/giftTheme';
import {
  fetchProdcutInfo,
  fetchProductDetail,
} from '../api/productInfo';
import { fetchProductReview } from '../api/productReview';
import { fetchThemeInfo } from '../api/themeInfo';
import { queryKeys } from '../constants/queryKeys';
import { fetchGiftProductById } from '../hooks/useGiftProductById';

export const giftProductQueryOptions = (id: number) => ({
  queryKey: queryKeys.giftProduct(id),
  queryFn: () => fetchGiftProductById(id),
  enabled: !!id,
});

export const giftRankingQueryOptions = (
  filter: string,
  tab: string
) => ({
  queryKey: queryKeys.giftRanking(filter, tab),
  queryFn: () => fetchGiftRanking(filter, tab),
});

export const giftThemesQueryOptions = () => ({
  queryKey: queryKeys.giftThemes,
  queryFn: async () => {
    const res = await fetchGiftThemes();
    return res.data;
  },
  staleTime: 1000 * 60 * 5,
  retry: 1,
});

export const giftThemeInfoQueryOptions = (themeId: number) => ({
  queryKey: queryKeys.themeInfo(themeId),
  queryFn: () => fetchThemeInfo(themeId),
  enabled: !!themeId,
  staleTime: 1000 * 60 * 5,
  retry: 1,
});

export const ProductDetailQueryOptions = (productId: number) => ({
  queryKey: queryKeys.productInfo(productId),
  queryFn: async () => {
    const res = await fetchProdcutInfo(productId);
    return res;
  },
});

export const ProductDescriptionQueryOptions = (
  productId: number
) => ({
  queryKey: queryKeys.productDescription(productId),
  queryFn: () => fetchProductDetail(productId),
  enabled: !!productId,
});

export const ProductReviewQueryOptions = (productId: number) => ({
  queryKey: queryKeys.productReview(productId),
  queryFn: () => fetchProductReview(productId),
  enabled: !!productId,
});
