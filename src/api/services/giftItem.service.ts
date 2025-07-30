import publicClient from '../clients/publicClient';
import type {
  CategoryCardData,
  GiftItemData,
  ThemedGiftItemsPage,
  ThemeInfo,
} from '../types/giftItem.dto';

export const getCategories = async () => {
  const { data } = await publicClient.get<{ data: CategoryCardData[] }>('/api/themes');
  return data.data;
};

export const getThemeInfo = async (id: number) => {
  const { data } = await publicClient.get<{ data: ThemeInfo }>(`/api/themes/${id}/info`);
  return data.data;
};

export const getThemedGiftItems = async (id: number, cursor: number) => {
  const { data } = await publicClient.get<{ data: ThemedGiftItemsPage }>(
    `/api/themes/${id}/products`,
    {
      params: {
        cursor: cursor,
        limit: 10,
      },
    }
  );
  return data.data;
};

export const getGiftItems = async (targetType: string, rankType: string) => {
  const { data } = await publicClient.get<{ data: GiftItemData[] }>(`/api/products/ranking`, {
    params: {
      targetType,
      rankType,
    },
  });
  return data.data;
};

export const getGiftItemDetail = async (id: number) => {
  const { data } = await publicClient.get<{ data: GiftItemData }>(`/api/products/${id}`);
  return data.data;
};
