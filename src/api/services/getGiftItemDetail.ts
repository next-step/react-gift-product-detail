import type { GiftItemData } from '@/types/giftItemData';
import publicClient from '../clients/publicClient';

type Params = {
  id: number;
};

interface GetGiftItemDetail {
  queryKey: [string, Params];
}

export const getGiftItemDetail = async ({ queryKey }: GetGiftItemDetail): Promise<GiftItemData> => {
  const { id } = queryKey[1];
  const response = await publicClient.get(`/api/products/${id}`);
  const { data } = response.data;
  return data;
};
