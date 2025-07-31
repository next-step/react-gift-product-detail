import { http, HttpResponse } from 'msw';

const mockRankingData = [
  { id: 1, name: '테스트 상품 1', price: { sellingPrice: 10000 }, brandInfo: { name: '브랜드' }, imageURL: '' },
  { id: 2, name: '테스트 상품 2', price: { sellingPrice: 20000 }, brandInfo: { name: '브랜드' }, imageURL: '' },
];

export const handlers = [
  http.post('/api/login', () => {
    return HttpResponse.json({
      data: {
        email: 'test@kakao.com',
        name: '테스터',
        authToken: 'dummy-token-for-test',
      },
    });
  }),

  http.get('/api/products/ranking', () => {
    return HttpResponse.json({
      data: mockRankingData,
    });
  }),
];
