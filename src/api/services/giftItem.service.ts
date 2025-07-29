import publicClient from '../clients/publicClient';
import type { QueryFunctionContext } from '@tanstack/react-query';
import type {
  CategoryCardData,
  GiftItemData,
  GiftItemDetailParams,
  GiftItemsParams,
  PageParam,
  QueryKey,
  ThemedGiftItemsPage,
  ThemeInfo,
} from '../types/giftItem.dto';

export const getCategories = async (): Promise<CategoryCardData[]> => {
  const { data } = await publicClient.get('/api/themes');
  const categories = data.data;
  return categories;
};

interface GetThemeInfo {
  queryKey: [string, { id: number }];
}

export const getThemeInfo = async ({ queryKey }: GetThemeInfo): Promise<ThemeInfo> => {
  const { id } = queryKey[1];
  const response = await publicClient.get(`/api/themes/${id}/info`);
  const { data } = response.data;

  return data;
};

export const getThemedGiftItems = async (
  context: QueryFunctionContext<QueryKey, PageParam>
): Promise<ThemedGiftItemsPage> => {
  const { id } = context.queryKey[1];
  const cursor = context.pageParam || 0;
  const response = await publicClient.get(`/api/themes/${id}/products?cursor=${cursor}&limit=10`);
  const { data } = response.data;
  return data;
};

interface GetGiftItems {
  queryKey: [string, GiftItemsParams];
}

export const getGiftItems = async ({ queryKey }: GetGiftItems): Promise<GiftItemData[]> => {
  const { targetType, rankType } = queryKey[1];
  const response = await publicClient.get(
    `/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
  );
  const { data } = response.data;
  return data;
};

interface GetGiftItemDetail {
  queryKey: [string, GiftItemDetailParams];
}

export const getGiftItemDetail = async ({ queryKey }: GetGiftItemDetail): Promise<GiftItemData> => {
  const { id } = queryKey[1];
  const response = await publicClient.get(`/api/products/${id}`);
  const { data } = response.data;
  return data;
};
