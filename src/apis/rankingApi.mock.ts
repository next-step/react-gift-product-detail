import { http, HttpResponse } from 'msw';
import { mockRanking } from '@/apis/mockData';

export const rankingHandlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') || 'ALL';
    const rankType = url.searchParams.get('rankType') || 'MANY_WISH';

    const filteredData = mockRanking.filter(
      p => p.gender === targetType && p.action === rankType
    );

    return HttpResponse.json({
      data: filteredData,
    });
  }),
];
