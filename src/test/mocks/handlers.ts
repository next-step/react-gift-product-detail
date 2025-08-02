import { http, HttpResponse } from 'msw';

const mockRankingData = [
  {
    id: 1,
    name: '스타벅스 아메리카노',
    price: { sellingPrice: 4500 },
    imageURL: 'https://example.com/americano.jpg',
    brandInfo: {
      name: '스타벅스',
      imageURL: 'https://example.com/starbucks.jpg',
    },
    rank: 1,
    rankChange: 2,
  },
  {
    id: 2,
    name: '올리브영 기프트카드',
    price: { sellingPrice: 10000 },
    imageURL: 'https://example.com/oliveyoung.jpg',
    brandInfo: {
      name: '올리브영',
      imageURL: 'https://example.com/oliveyoung-brand.jpg',
    },
    rank: 2,
    rankChange: 1,
  },
  {
    id: 3,
    name: '배스킨라빈스 파인트',
    price: { sellingPrice: 8000 },
    imageURL: 'https://example.com/baskin.jpg',
    brandInfo: {
      name: '배스킨라빈스',
      imageURL: 'https://example.com/baskin-brand.jpg',
    },
    rank: 3,
    rankChange: -1,
  },
  {
    id: 4,
    name: '쿠팡 기프트카드',
    price: { sellingPrice: 50000 },
    imageURL: 'https://example.com/coupang.jpg',
    brandInfo: {
      name: '쿠팡',
      imageURL: 'https://example.com/coupang-brand.jpg',
    },
    rank: 4,
    rankChange: 3,
  },
  {
    id: 5,
    name: '네이버페이 머니',
    price: { sellingPrice: 10000 },
    imageURL: 'https://example.com/naverpay.jpg',
    brandInfo: {
      name: '네이버',
      imageURL: 'https://example.com/naver-brand.jpg',
    },
    rank: 5,
    rankChange: 0,
  },
];

const errorResponse = {
  message: '서버 오류가 발생했습니다.',
  status: 500,
};

export const handlers = [
  http.get('/api/products/ranking', () => {
    return HttpResponse.json({
      data: mockRankingData,
    });
  }),

  http.get('/api/products/ranking/error', () => {
    return HttpResponse.json(errorResponse, { status: 500 });
  }),

  http.get('/api/products/ranking/empty', () => {
    return HttpResponse.json({
      data: [],
    });
  }),

  http.get('/api/products/ranking/network-error', () => {
    return HttpResponse.error();
  }),
];
