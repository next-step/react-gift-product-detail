import { http, HttpResponse } from 'msw';
import type { LoginCredentials, User } from 'src/types/auth';
import type { ProductBasicInfo } from 'src/types/product';

// 랭킹 성공 시 응답 본문 타입
interface RankingSuccessResponse {
  data: ProductBasicInfo[];
}

// 랭킹 실패 시 응답 본문 타입
interface RankingErrorResponse {
  message: string;
}

// 랭킹 상품 핸들러
export const rankingHandler = http.get<
  never,
  never,
  RankingSuccessResponse | RankingErrorResponse
>(
  // 쿼리 파라미터를 그대로 사용하도록 와일드카드 (*) 처리
  '/products/ranking',
  () => {
    return HttpResponse.json(
      {
        data: [
          {
            id: 1,
            name: '케이크',
            imageURL:
              'https://images.unsplash.com/photo-1562447814-1188448f7d9a?w=800',
            price: {
              basicPrice: 30000,
              discountRate: 10,
              sellingPrice: 27000,
            },
            brandInfo: {
              id: 101,
              name: '맛있는 케이크',
              imageURL:
                'https://images.unsplash.com/photo-1541334812-70b777a110a1?w=800',
            },
          },
          {
            id: 2,
            name: '꽃다발',
            imageURL:
              'https://images.unsplash.com/photo-1596785265437-0131102b4d1c?w=800',
            price: {
              basicPrice: 50000,
              discountRate: 0,
              sellingPrice: 50000,
            },
            brandInfo: {
              id: 102,
              name: '아름다운 꽃집',
              imageURL:
                'https://images.unsplash.com/photo-1562447814-1188448f7d9a?w=800',
            },
          },
        ],
      },
      {
        status: 200,
      }
    );

    // 2. 실패 케이스
    // return HttpResponse.json(
    //   {
    //     message: 'Failed to fetch ranking products.',
    //   },
    //   {
    //     status: 500,
    //   },
    // );
  }
);

// 로그인 성공 시 응답 본문 타입
interface LoginSuccessResponse {
  data: User;
}

// 로그인 실패 시 응답 본문 타입
interface LoginErrorResponse {
  message: string;
}

// 로그인 핸들러
export const loginHandler = http.post<
  never,
  LoginCredentials,
  LoginSuccessResponse | LoginErrorResponse
>(import.meta.env.VITE_API_BASE_URL + '/login', async ({ request }) => {
  const { email, password } = await request.json();
  console.log('로그인 시도: ', { email, password });

  if (email === 'test@kakao.com' && password === 'password123') {
    // 로그인 성공 시 응답
    return HttpResponse.json(
      {
        data: {
          email: 'test@kakao.com',
          name: 'test',
          authToken: 'mock-auth-token',
        },
      },
      {
        status: 200,
      }
    );
  }

  // 로그인 실패 시 응답
  return HttpResponse.json(
    {
      message: 'Invalid email or password.',
    },
    {
      status: 401,
    }
  );
});

// 모든 핸들러를 배열로 내보내어 한 번에 사용할 수 있게 함
export const handlers = [rankingHandler, loginHandler];
