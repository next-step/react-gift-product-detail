import { http, HttpResponse } from 'msw';
import { giftRankingMap } from './mockGiftRankingData';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'fail@fail.com') {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      email: body.email,
      name: body.email.split('@')[0],
      authToken: '123456',
    });
  }),

  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') ?? 'ALL';
    const rankType = url.searchParams.get('rankType') ?? 'MANY_WISH';
    const key = `${targetType}_${rankType}` as keyof typeof giftRankingMap;

    const data = giftRankingMap[key] ?? [];

    return HttpResponse.json({ data }, { status: 200 });
  }),
];
