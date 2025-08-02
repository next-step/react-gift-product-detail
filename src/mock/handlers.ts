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
const mockProducts = [
  {
    id: 1,
    name: '케이크',
    imageURL: 'image-1.jpg',
    price: { basicPrice: 30000, discountRate: 10, sellingPrice: 27000 },
    brandInfo: { id: 101, name: '맛있는 케이크', imageURL: 'brand-1.jpg' },
  },
  {
    id: 2,
    name: '꽃다발',
    imageURL: 'image-2.jpg',
    price: { basicPrice: 50000, discountRate: 0, sellingPrice: 50000 },
    brandInfo: { id: 102, name: '아름다운 꽃집', imageURL: 'brand-2.jpg' },
  },
  {
    id: 3,
    name: '향수',
    imageURL: 'image-3.jpg',
    price: { basicPrice: 100000, discountRate: 5, sellingPrice: 95000 },
    brandInfo: { id: 103, name: '좋은 향기', imageURL: 'brand-3.jpg' },
  },
  {
    id: 4,
    name: '커피',
    imageURL: 'image-4.jpg',
    price: { basicPrice: 5000, discountRate: 0, sellingPrice: 5000 },
    brandInfo: { id: 104, name: '커피 랩', imageURL: 'brand-4.jpg' },
  },
  {
    id: 5,
    name: '티셔츠',
    imageURL: 'image-5.jpg',
    price: { basicPrice: 20000, discountRate: 20, sellingPrice: 16000 },
    brandInfo: { id: 105, name: '예쁜 옷', imageURL: 'brand-5.jpg' },
  },
  {
    id: 6,
    name: '화장품',
    imageURL: 'image-6.jpg',
    price: { basicPrice: 40000, discountRate: 15, sellingPrice: 34000 },
    brandInfo: { id: 106, name: '뷰티월드', imageURL: 'brand-6.jpg' },
  },
  {
    id: 7,
    name: '와인',
    imageURL: 'image-7.jpg',
    price: { basicPrice: 70000, discountRate: 10, sellingPrice: 63000 },
    brandInfo: { id: 107, name: '와인창고', imageURL: 'brand-7.jpg' },
  },
];

// 랭킹 상품 성공 케이스 핸들러
export const rankingHandler = http.get<never, never, RankingSuccessResponse>(
  `${import.meta.env.VITE_API_BASE_URL}/products/ranking`,
  () => {
    return HttpResponse.json(
      {
        data: mockProducts,
      },
      {
        status: 200,
      }
    );
  }
);

// 랭킹 상품 실패 케이스 핸들러
export const rankingErrorHandler = http.get<never, never, RankingErrorResponse>(
  `${import.meta.env.VITE_API_BASE_URL}/products/ranking`,
  () => {
    return HttpResponse.json(
      {
        message: 'Failed to fetch ranking products.',
      },
      {
        status: 500,
      }
    );
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
>(`${import.meta.env.VITE_API_BASE_URL}/login`, async ({ request }) => {
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
      status: 400,
    }
  );
});

// 모든 핸들러를 배열로 내보내어 한 번에 사용할 수 있게 함
export const handlers = [rankingHandler, rankingErrorHandler, loginHandler];
