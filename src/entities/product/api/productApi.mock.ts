import { http, HttpResponse } from 'msw';
import { mockRankingProducts } from './mockData';

export const rankingHandlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') || 'ALL';
    const rankType = url.searchParams.get('rankType') || 'MANY_WISH';

    const filteredData = mockRankingProducts.filter(
      p => p.gender === targetType && p.action === rankType
    );

    return HttpResponse.json({
      data: filteredData,
    });
  }),
];
