import { http, HttpResponse } from 'msw';

// ALL
import { ALL_MANY_WISH } from '../mock_data/all_many_wish';
import { ALL_MANY_RECEIVE } from '../mock_data/all_many_receive';
import { ALL_MANY_WISH_RECEIVE } from '../mock_data/all_many_wish_receive';

// FEMALE
import { FEMALE_MANY_WISH } from '../mock_data/female_many_wish';
import { FEMALE_MANY_RECEIVE } from '../mock_data/female_many_receive';
import { FEMALE_MANY_WISH_RECEIVE } from '../mock_data/female_many_wish_receive';

// MALE
import { MALE_MANY_WISH } from '../mock_data/male_many_wish';
import { MALE_MANY_RECEIVE } from '../mock_data/male_many_receive';
import { MALE_MANY_WISH_RECEIVE } from '../mock_data/male_many_wish_receive';
import type { GiftItemData } from '@/api/types/giftItem.dto';

// TEEN: 목데이터 파일 없이 처리 (빈 배열)

export const handlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') ?? '';
    const rankType = url.searchParams.get('rankType') ?? '';

    const key = `${targetType}_${rankType}`;

    // TEEN 요청이면 무조건 빈 배열 반환
    if (targetType === 'TEEN') {
      return HttpResponse.json({ data: [] });
    }

    const dataMap: Record<string, GiftItemData[]> = {
      // ALL
      ALL_MANY_WISH: ALL_MANY_WISH,
      ALL_MANY_RECEIVE: ALL_MANY_RECEIVE,
      ALL_MANY_WISH_RECEIVE: ALL_MANY_WISH_RECEIVE,

      // FEMALE
      FEMALE_MANY_WISH: FEMALE_MANY_WISH,
      FEMALE_MANY_RECEIVE: FEMALE_MANY_RECEIVE,
      FEMALE_MANY_WISH_RECEIVE: FEMALE_MANY_WISH_RECEIVE,

      // MALE
      MALE_MANY_WISH: MALE_MANY_WISH,
      MALE_MANY_RECEIVE: MALE_MANY_RECEIVE,
      MALE_MANY_WISH_RECEIVE: MALE_MANY_WISH_RECEIVE,
    };

    const data = dataMap[key] ?? [];

    return HttpResponse.json({ data });
  }),
];
