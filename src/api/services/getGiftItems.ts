import type { GiftItemData } from '@/types/giftItemData';
import publicClient from '../clients/publicClient';

type Params = {
  targetType: string;
  rankType: string;
};

interface GetGiftItems {
  queryKey: [string, Params];
}

const getGiftItems = async ({ queryKey }: GetGiftItems): Promise<GiftItemData[]> => {
  const { targetType, rankType } = queryKey[1];
  const response = await publicClient.get(
    `/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
  );
  const { data } = response.data;
  return data;
};

export default getGiftItems;
