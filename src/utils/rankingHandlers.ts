import { http, HttpResponse } from 'msw';
import { PRODUCTS_PUB_DATA } from '@/mocks/tests';

export const rankingHandlers = [
  http.get('http://localhost:3000/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType');
    const rankType = url.searchParams.get('rankType');
    const key = `${targetType}-${rankType}`;

    const mockDataByCombination: Record<string, typeof PRODUCTS_PUB_DATA> = {
      'ALL-MANY_WISH': PRODUCTS_PUB_DATA,
      'ALL-MANY_RECEIVE': PRODUCTS_PUB_DATA,
      'ALL-MANY_WISH_RECEIVE': PRODUCTS_PUB_DATA,
      'TEEN-MANY_WISH': PRODUCTS_PUB_DATA,
    };

    const data = mockDataByCombination[key] || [];

    return HttpResponse.json({ data });
  }),
];
