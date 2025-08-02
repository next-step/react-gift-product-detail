import { http, HttpResponse } from 'msw';
import { rankingData } from '@src/mocks/mockData';

export const handlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const targetType = params.get('targetType') || 'ALL';
    const rankType = params.get('rankType') || 'MANY_WISH';

    const validTargetTypes = ['ALL', 'FEMALE', 'MALE', 'TEEN'];
    const validRankTypes = ['MANY_WISH', 'MANY_RECEIVE', 'MANY_WISH_RECEIVE'];

    if (
      !validTargetTypes.includes(targetType) ||
      !validRankTypes.includes(rankType)
    ) {
      return HttpResponse.json(
        { message: '잘못된 targetType 또는 rankType입니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json({ data: rankingData }, { status: 200 });
  }),
];
