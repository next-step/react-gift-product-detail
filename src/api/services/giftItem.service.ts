import publicClient from '../clients/publicClient';
import type { QueryFunctionContext } from '@tanstack/react-query';
import type {
  CategoryCardData,
  GiftItemData,
  PageParam,
  QueryKey,
  ThemedGiftItemsPage,
  ThemeInfo,
} from '../types/giftItem.dto';

export const getCategories = async () => {
  const { data } = await publicClient.get<{ data: CategoryCardData[] }>('/api/themes');
  return data.data;
};

export const getThemeInfo = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { id } = queryKey[1];
  const { data } = await publicClient.get<{ data: ThemeInfo }>(`/api/themes/${id}/info`);
  return data.data;
};

export const getThemedGiftItems = async (context: QueryFunctionContext<QueryKey, PageParam>) => {
  const { id } = context.queryKey[1];
  const cursor = context.pageParam || 0;
  const { data } = await publicClient.get<{ data: ThemedGiftItemsPage }>(
    `/api/themes/${id}/products?cursor=${cursor}&limit=10`
  );
  return data.data;
};

export const getGiftItems = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { targetType, rankType } = queryKey[1];
  const { data } = await publicClient.get<{ data: GiftItemData[] }>(
    `/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
  );
  return data.data;
};

export const getGiftItemDetail = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { id } = queryKey[1];
  const { data } = await publicClient.get<{ data: GiftItemData }>(`/api/products/${id}`);
  return data.data;
};
