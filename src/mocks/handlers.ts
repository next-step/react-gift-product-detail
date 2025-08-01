import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products/ranking', () => {
    return HttpResponse.json({
      data: [
        {
          id: 11526198,
          name: '스트로베리 초콜릿 생크림',
          price: {
            basicPrice: 39000,
            sellingPrice: 39000,
            discountRate: 0,
          },
          imageURL: 'https://example.com/image.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL: 'https://example.com/brand.jpg',
          },
        },
      ],
    });
  }),
];
