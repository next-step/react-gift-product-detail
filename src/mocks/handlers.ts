import { http, HttpResponse } from 'msw';

const testBaseURL = 'http://localhost:3000/api';

export const handlers = [
  http.get(`${testBaseURL}/products/:id/summary`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      data: {
        id: Number(id),
        name: 'MockData',
        brandName: 'MockBrand',
        price: 12345,
        imageURL: 'https://picsum.photos/300/300',
      },
    });
  }),

  http.post(`${testBaseURL}/order`, async () => {
    return HttpResponse.json({
      data: {
        success: true,
      },
    });
  }),

  http.post(`${testBaseURL}/login`, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    if (!email.endsWith('@kakao.com')) {
      return HttpResponse.json(
        { message: '@kakao.com 이메일 주소만 가능합니다' },
        { status: 400 },
      );
    }
    return HttpResponse.json({
      data: {
        name: '테스트 사용자',
        email: 'test@kakao.com',
        authToken: 'mock-token',
      },
    });
  }),

  http.get(`${testBaseURL}/products/ranking`, () => {
    const mockRanking = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `상품 ${i + 1}`,
      imageURL: `https://picsum.photos/300/300?random=${i + 1}`,
      price: {
        basicPrice: 1000 * (i + 1),
        sellingPrice: 1000 * (i + 1),
        discountRate: i,
      },
      brandInfo: {
        id: i + 1,
        name: `브랜드 ${i + 1}`,
        imageURL: `https://picsum.photos/100/100?random=${i + 100}`,
      },
    }));

    return HttpResponse.json({ data: mockRanking });
  }),

  http.get(`${testBaseURL}/products/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      data: {
        id: Number(id),
        name: '테스트 상품',
        imageURL: 'https://picsum.photos/400/400',
        price: {
          basicPrice: 15000,
          sellingPrice: 12000,
          discountRate: 20,
        },
        brandInfo: {
          id: 1,
          name: 'MockBrand',
          imageURL: 'https://picsum.photos/100/100',
        },
      },
    });
  }),

  http.get(`${testBaseURL}/products/:id/detail`, () => {
    return HttpResponse.json({
      data: {
        description: '<p>상품에 대한 자세한 설명입니다.</p><p>이 상품은 정말 좋은 품질을 자랑합니다.</p>',
        announcements: [
          {
            name: '배송 안내',
            value: '주문 후 1-2일 내 배송됩니다.',
            displayOrder: 1,
          },
          {
            name: '교환/반품 안내',
            value: '7일 이내 교환/반품 가능합니다.',
            displayOrder: 2,
          },
        ],
      },
    });
  }),

  http.get(`${testBaseURL}/products/:id/highlight-review`, () => {
    return HttpResponse.json({
      data: {
        totalCount: 2,
        reviews: [
          {
            id: '1',
            authorName: '리뷰어1',
            content: '정말 좋은 상품입니다!',
          },
          {
            id: '2',
            authorName: '리뷰어2',
            content: '기대 이상이었어요.',
          },
        ],
      },
    });
  }),

  http.get(`${testBaseURL}/products/:id/wish`, () => {
    return HttpResponse.json({
      data: {
        wishCount: 42,
        isWished: false,
      },
    });
  }),

  http.get(`${testBaseURL}/themes`, () => {
    return HttpResponse.json({
      data: [
        {
          themeId: 1,
          name: '테마 1',
          image: 'https://picsum.photos/200/200?random=1',
        },
        {
          themeId: 2,
          name: '테마 2',
          image: 'https://picsum.photos/200/200?random=2',
        },
        {
          themeId: 3,
          name: '테마 3',
          image: 'https://picsum.photos/200/200?random=3',
        },
      ],
    });
  }),

  http.get(`${testBaseURL}/themes/:themeId/info`, ({ params }) => {
    const { themeId } = params;
    return HttpResponse.json({
      data: {
        backgroundColor: '#f0f0f0',
        description: `테마 ${themeId}에 대한 설명입니다.`,
        name: `테마 ${themeId}`,
        themeId: Number(themeId),
        title: `테마 ${themeId} 제목`,
      },
    });
  }),

  http.get(`${testBaseURL}/themes/:themeId/products`, ({ params, request }) => {
    const { themeId } = params;
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor') || '0';
    const limit = url.searchParams.get('limit') || '10';
    
    const mockProducts = Array.from({ length: Number(limit) }, (_, i) => ({
      id: Number(cursor) * Number(limit) + i + 1,
      name: `테마 ${themeId} 상품 ${Number(cursor) * Number(limit) + i + 1}`,
      imageURL: `https://picsum.photos/300/300?random=${Number(cursor) * Number(limit) + i + 1}`,
      price: {
        basicPrice: 1000 * (Number(cursor) * Number(limit) + i + 1),
        sellingPrice: 1000 * (Number(cursor) * Number(limit) + i + 1),
        discountRate: i,
      },
      brandInfo: {
        id: Number(cursor) * Number(limit) + i + 1,
        name: `브랜드 ${Number(cursor) * Number(limit) + i + 1}`,
        imageURL: `https://picsum.photos/100/100?random=${Number(cursor) * Number(limit) + i + 100}`,
      },
    }));

    return HttpResponse.json({
      data: {
        list: mockProducts,
        cursor: Number(cursor),
        hasMoreList: Number(cursor) < 5,
      },
    });
  }),
]; 