import { http } from 'msw'

/**
 * MSW 핸들러 설정
 *
 * Given: 각 API 엔드포인트에 대한 요청이 들어올 때
 * When: MSW가 요청을 가로채면
 * Then: 적절한 응답을 반환한다
 */
export const handlers = [
  /**
   * 시나리오: 로그인 API 핸들러
   * - Given: 로그인 요청이 들어올 때
   * - When: 올바른 이메일/비밀번호가 전송되면
   * - Then: 사용자 정보와 토큰을 반환한다
   */
  http.post('https://localhost:3000/api/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }

    // * 300ms 지연 시뮬레이션
    await new Promise((r) => setTimeout(r, 300))

    // * 잘못된 로그인 정보 처리
    if (body?.email === 'wrong@kakao.com' || body?.password === 'wrong') {
      return Response.json({ message: '로그인에 실패했습니다.' }, { status: 401 })
    }

    const response = {
      data: {
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'mock-auth-token-12345',
      },
    }

    return Response.json(response, { status: 200 })
  }),

  /**
   * 시나리오: 상품 랭킹 API 핸들러
   * - Given: 상품 랭킹 요청이 들어올 때
   * - When: targetType과 rankType 파라미터가 전송되면
   * - Then: 해당 조건에 맞는 상품 목록을 반환한다
   */
  http.get('https://localhost:3000/api/products/ranking', async ({ request }) => {
    const url = new URL(request.url)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const targetType = url.searchParams.get('targetType') || 'ALL'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rankType = url.searchParams.get('rankType') || 'MANY_WISH'

    // * 200ms 지연 시뮬레이션
    await new Promise((r) => setTimeout(r, 200))

    const mockProducts = [
      {
        id: 11712379,
        name: '부드러운 고구마 라떼 케이크',
        imageURL:
          'https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg',
        price: {
          basicPrice: 31000,
          sellingPrice: 26350,
          discountRate: 15,
        },
        brandInfo: {
          id: 27,
          name: '뚜레쥬르',
          imageURL:
            'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
        },
      },
      {
        id: 10349024,
        name: '5만원권',
        imageURL:
          'https://st.kakaocdn.net/product/gift/product/20200924101152_16bb00f28a984b03a2efbdb9cec990d1.jpg',
        price: {
          basicPrice: 50000,
          sellingPrice: 50000,
          discountRate: 0,
        },
        brandInfo: {
          id: 4784,
          name: '성심당',
          imageURL:
            'https://st.kakaocdn.net/product/gift/gift_brand/20200923160929_0ad3cff2a7564c4a967e30670b179a91.jpg',
        },
      },
      {
        id: 11477185,
        name: '스트로베리 요거트 생크림',
        imageURL:
          'https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg',
        price: {
          basicPrice: 29000,
          sellingPrice: 29000,
          discountRate: 0,
        },
        brandInfo: {
          id: 27,
          name: '뚜레쥬르',
          imageURL:
            'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
        },
      },
    ]

    return Response.json({ data: mockProducts }, { status: 200 })
  }),
]
