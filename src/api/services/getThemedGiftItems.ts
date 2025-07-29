import type { GiftItemData } from '@/types/giftItemData';
import publicClient from '../clients/publicClient';
import type { QueryFunctionContext } from '@tanstack/react-query';

type ThemedGiftItemsPage = {
  list: GiftItemData[];
  cursor: number;
  hasMoreList: boolean;
};

type Params = {
  id: number;
};

type QueryKey = [string, Params];

type PageParam = number;

export const getThemedGiftItems = async (
  context: QueryFunctionContext<QueryKey, PageParam>
): Promise<ThemedGiftItemsPage> => {
  const { id } = context.queryKey[1];
  const cursor = context.pageParam || 0;
  const response = await publicClient.get(`/api/themes/${id}/products?cursor=${cursor}&limit=10`);
  const { data } = response.data;
  return data;
};
