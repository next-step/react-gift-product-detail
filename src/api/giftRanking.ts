import { fetcher } from './client';

export const fetchGiftRanking = async (
  filter: string,
  tab: string
) => {
  const endpoint = `/api/products/ranking?filter=${filter}&tab=${tab}`;
  const res = await fetcher(
    endpoint,
    '선물랭킹을 불러오지 못했습니다.'
  );
  return res.data;
};
