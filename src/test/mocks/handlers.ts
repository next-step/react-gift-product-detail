import { http, HttpResponse } from 'msw';

export const handlers = [
  // 랭킹 상품 API 모킹
  http.get('/api/products/ranking', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '테스트 상품 1',
        imageURL: 'https://via.placeholder.com/200',
        brandInfo: {
          name: '테스트 브랜드',
          imageURL: 'https://via.placeholder.com/50'
        },
        price: {
          sellingPrice: 15000,
          basicPrice: 20000,
          discountRate: 25
        },
        rankingType: 'wanted'
      },
      {
        id: 2,
        name: '테스트 상품 2',
        imageURL: 'https://via.placeholder.com/200',
        brandInfo: {
          name: '테스트 브랜드 2',
          imageURL: 'https://via.placeholder.com/50'
        },
        price: {
          sellingPrice: 25000,
          basicPrice: 30000,
          discountRate: 17
        },
        rankingType: 'given'
      }
    ]);
  }),

  // 로그인 API 모킹
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    
    if (body?.email === 'test@kakao.com' && body?.password === 'password') {
      return HttpResponse.json({
        data: {
          user: {
            id: 1,
            name: '테스트 사용자',
            email: 'test@kakao.com',
            authToken: 'test-token-123'
          }
        }
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  })
]; 