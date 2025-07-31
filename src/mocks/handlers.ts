import { rest } from 'msw';

export const handlers = [
  // 랭킹 API 예시 핸들러
  rest.get('http://localhost:3000/api/products/ranking', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            name: '테스트 상품',
            price: {
              basicPrice: 10000,
              sellingPrice: 9000,
              discountRate: 10,
            },
            imageURL: 'https://example.com/image.jpg',
            brandInfo: {
              id: 1,
              name: '브랜드',
              imageURL: 'https://example.com/brand.jpg',
            },
          },
        ],
      })
    );
  }),
];
