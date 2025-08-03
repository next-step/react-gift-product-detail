import { http, HttpResponse } from "msw";
import { mockGiftRanking } from "./mock";

export const giftRankingHandlers = [
  http.get('/api/gift-rankings', () => {
    return HttpResponse.json({ data: mockGiftRanking }, { status: 200 });
  }),
];
