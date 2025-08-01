import { http } from 'msw';

export const handlers = [
  // 랭킹 API 핸들러
  http.get('http://localhost:3000/api/products/ranking', () => {
    // 다양한 시나리오를 위한 모의 데이터
    const mockProducts = [
      {
        id: 1,
        name: '테스트 상품 1',
        price: {
          basicPrice: 10000,
          sellingPrice: 9000,
          discountRate: 10,
        },
        imageURL: 'https://example.com/image1.jpg',
        brandInfo: {
          id: 1,
          name: '브랜드 A',
          imageURL: 'https://example.com/brand1.jpg',
        },
      },
      {
        id: 2,
        name: '테스트 상품 2',
        price: {
          basicPrice: 20000,
          sellingPrice: 18000,
          discountRate: 10,
        },
        imageURL: 'https://example.com/image2.jpg',
        brandInfo: {
          id: 2,
          name: '브랜드 B',
          imageURL: 'https://example.com/brand2.jpg',
        },
      },
      {
        id: 3,
        name: '테스트 상품 3',
        price: {
          basicPrice: 15000,
          sellingPrice: 12000,
          discountRate: 20,
        },
        imageURL: 'https://example.com/image3.jpg',
        brandInfo: {
          id: 3,
          name: '브랜드 C',
          imageURL: 'https://example.com/brand3.jpg',
        },
      },
      {
        id: 4,
        name: '테스트 상품 4',
        price: {
          basicPrice: 30000,
          sellingPrice: 25000,
          discountRate: 17,
        },
        imageURL: 'https://example.com/image4.jpg',
        brandInfo: {
          id: 4,
          name: '브랜드 D',
          imageURL: 'https://example.com/brand4.jpg',
        },
      },
      {
        id: 5,
        name: '테스트 상품 5',
        price: {
          basicPrice: 5000,
          sellingPrice: 4000,
          discountRate: 20,
        },
        imageURL: 'https://example.com/image5.jpg',
        brandInfo: {
          id: 5,
          name: '브랜드 E',
          imageURL: 'https://example.com/brand5.jpg',
        },
      },
      {
        id: 6,
        name: '테스트 상품 6',
        price: {
          basicPrice: 25000,
          sellingPrice: 20000,
          discountRate: 20,
        },
        imageURL: 'https://example.com/image6.jpg',
        brandInfo: {
          id: 6,
          name: '브랜드 F',
          imageURL: 'https://example.com/brand6.jpg',
        },
      },
      {
        id: 7,
        name: '테스트 상품 7',
        price: {
          basicPrice: 18000,
          sellingPrice: 15000,
          discountRate: 17,
        },
        imageURL: 'https://example.com/image7.jpg',
        brandInfo: {
          id: 7,
          name: '브랜드 G',
          imageURL: 'https://example.com/brand7.jpg',
        },
      },
    ];

    return Response.json({
      data: mockProducts,
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
