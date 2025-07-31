import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

export const mockProducts = {
  data: [
    {
      id: 11712379,
      name: "부드러운 고구마 라떼 케이크",
      price: {
        basicPrice: 31000,
        sellingPrice: 26350,
        discountRate: 15,
      },
      imageURL:
        "https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg",
      brandInfo: {
        id: 27,
        name: "뚜레쥬르",
        imageURL:
          "https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg",
      },
    },
    {
      id: 10349024,
      name: "5만원권",
      price: {
        basicPrice: 50000,
        sellingPrice: 50000,
        discountRate: 0,
      },
      imageURL:
        "https://st.kakaocdn.net/product/gift/product/20200924101152_16bb00f28a984b03a2efbdb9cec990d1.jpg",
      brandInfo: {
        id: 4784,
        name: "성심당",
        imageURL:
          "https://st.kakaocdn.net/product/gift/gift_brand/20200923160929_0ad3cff2a7564c4a967e30670b179a91.jpg",
      },
    },
    {
      id: 11477185,
      name: "스트로베리 요거트 생크림",
      price: {
        basicPrice: 29000,
        sellingPrice: 29000,
        discountRate: 0,
      },
      imageURL:
        "https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg",
      brandInfo: {
        id: 27,
        name: "뚜레쥬르",
        imageURL:
          "https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg",
      },
    },
    {
      id: 11526708,
      name: "떠먹는 티라미수 + 아메리카노 R 2잔",
      price: {
        basicPrice: 16200,
        sellingPrice: 16200,
        discountRate: 0,
      },
      imageURL:
        "https://st.kakaocdn.net/product/gift/product/20250324154718_23d0ce897922417e83a7ac72ecfadca8.jpg",
      brandInfo: {
        id: 33,
        name: "투썸플레이스",
        imageURL:
          "https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png",
      },
    },
  ],
};

export const handlers = [
  http.post(API_ENDPOINTS.LOGIN, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };

    if (email === "test@kakao.com") {
      return HttpResponse.json({
        email: "test@kakao.com",
        name: "테스트유저",
        authToken: "fake-auth-token",
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }
  }),

  http.get(API_ENDPOINTS.RANKING, ({ request }) => {
    const url = new URL(request.url);
    const rankType = url.searchParams.get("rankType");

    // 에러 시나리오 테스트를 위한 조건
    if (rankType === "ERROR") {
      return new HttpResponse(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }

    return HttpResponse.json(mockProducts);
  }),
];