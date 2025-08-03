import { http, HttpResponse } from 'msw';
import { RankingMockData } from '@/mocks/data/mockRankingData';

export const handlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const rankType = url.searchParams.get('rankType');
    const targetType = url.searchParams.get('targetType');

    if (rankType === 'BIRTHDAY' && targetType === 'FEMALE') {
      return HttpResponse.json({ data: RankingMockData });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
