import { http, HttpResponse } from 'msw';

// 로그인 API 핸들러
export const loginHandler = http.post('/api/login', () => {
  return HttpResponse.json({
    success: true,
    data: {
      email: 'test@kakao.com',
      name: '테스트 사용자',
      authToken: 'mock-jwt-token',
    },
  });
});

// 트렌딩 선물 랭킹 API 핸들러
export const trendingGiftsHandler = http.get('/api/products/ranking', () => {
  return HttpResponse.json({
    success: true,
    data: [
      {
        id: 1,
        name: '트렌딩 선물 1',
        price: {
          basicPrice: 60000,
          sellingPrice: 50000,
          discountRate: 17,
        },
        imageURL: '/images/gift1.jpg',
        brandInfo: {
          id: 1,
          name: '브랜드1',
          imageURL: '/images/brand1.jpg',
        },
        themeIds: [1, 2],
      },
      {
        id: 2,
        name: '트렌딩 선물 2',
        price: {
          basicPrice: 40000,
          sellingPrice: 30000,
          discountRate: 25,
        },
        imageURL: '/images/gift2.jpg',
        brandInfo: {
          id: 2,
          name: '브랜드2',
          imageURL: '/images/brand2.jpg',
        },
        themeIds: [2, 3],
      },
      {
        id: 3,
        name: '트렌딩 선물 3',
        price: {
          basicPrice: 80000,
          sellingPrice: 70000,
          discountRate: 13,
        },
        imageURL: '/images/gift3.jpg',
        brandInfo: {
          id: 3,
          name: '브랜드3',
          imageURL: '/images/brand3.jpg',
        },
        themeIds: [1, 3],
      },
    ],
  });
});

export const handlers = [loginHandler, trendingGiftsHandler];
