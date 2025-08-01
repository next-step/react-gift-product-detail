import { http } from 'msw';

export const handlers = [
  // 랭킹 API 예시 핸들러
  http.get('http://localhost:3000/api/products/ranking', () => {
    return Response.json({
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
    });
  }),

  // 로그인 API 핸들러
  http.post('http://localhost:3000/api/login', async ({ request }) => {
    const body = (await request.json()) as Record<string, any>;

    // 성공 케이스: 이메일이 있고 비밀번호가 8자 이상
    if (body.email && body.password && body.password.length >= 8) {
      return Response.json({
        data: {
          email: body.email,
          name: 'user',
          authToken: 'dummy-token',
        },
      });
    }

    // 실패 케이스
    return Response.json(
      {
        data: {
          status: 'BAD_REQUEST',
          statusCode: 400,
          message: '잘못된 이메일 또는 비밀번호입니다.',
        },
      },
      { status: 400 }
    );
  }),
];
