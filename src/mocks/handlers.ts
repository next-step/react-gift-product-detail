import { http, HttpResponse } from "msw";
import { mockGiftRanking } from './mock';

export const handlers = [
 http.get('/api/products/ranking', () => {
    return HttpResponse.json({ data: mockGiftRanking })
  }),
];
