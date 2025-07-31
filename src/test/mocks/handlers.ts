import { http, HttpResponse } from 'msw';

// 트렌딩 선물 랭킹 API 핸들러
export const trendingGiftsHandler = http.get('/api/trending-gifts', () => {
  return HttpResponse.json({
    success: true,
    data: [
      {
        id: 1,
        name: '트렌딩 선물 1',
        price: {
          sellingPrice: 50000,
        },
        imageURL: '/images/gift1.jpg',
        brandInfo: {
          name: '브랜드1',
        },
        ranking: 1,
      },
      {
        id: 2,
        name: '트렌딩 선물 2',
        price: {
          sellingPrice: 30000,
        },
        imageURL: '/images/gift2.jpg',
        brandInfo: {
          name: '브랜드2',
        },
        ranking: 2,
      },
      {
        id: 3,
        name: '트렌딩 선물 3',
        price: {
          sellingPrice: 70000,
        },
        imageURL: '/images/gift3.jpg',
        brandInfo: {
          name: '브랜드3',
        },
        ranking: 3,
      },
    ],
  });
});

export const handlers = [trendingGiftsHandler];
