import { http, HttpResponse } from 'msw';

export const rankingHandlers = [
  http.get('http://localhost:3000/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType');
    const rankType = url.searchParams.get('rankType');

    const mockDataByCombination = {
      'ALL-MANY_WISH': [
        {
          id: 1,
          name: '부드러운 고구마 라떼 케이크',
          price: {
            basicPrice: 31000,
            sellingPrice: 26350,
            discountRate: 15,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg',
          brandInfo: {
            id: 1,
            name: '뚜레쥬르',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
          },
        },
        {
          id: 2,
          name: '5만원권',
          price: {
            basicPrice: 50000,
            sellingPrice: 50000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20200924101152_16bb00f28a984b03a2efbdb9cec990d1.jpg',
          brandInfo: {
            id: 2,
            name: '성심당',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20200923160929_0ad3cff2a7564c4a967e30670b179a91.jpg',
          },
        },
      ],
      'ALL-MANY_RECEIVE': [
        {
          id: 3,
          name: '스트로베리 요거트 생크림',
          price: {
            basicPrice: 29000,
            sellingPrice: 29000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg',
          brandInfo: {
            id: 3,
            name: '뚜레쥬르',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
          },
        },
        {
          id: 4,
          name: '아메리카노 세트',
          price: {
            basicPrice: 15000,
            sellingPrice: 12000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250324154718_23d0ce897922417e83a7ac72ecfadca8.jpg',
          brandInfo: {
            id: 4,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
      ],
      'ALL-MANY_WISH_RECEIVE': [
        {
          id: 5,
          name: '케이크',
          price: {
            basicPrice: 45000,
            sellingPrice: 36000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250421155731_3de0cb1b4e994aac8d450de0b31877bc.jpg',
          brandInfo: {
            id: 5,
            name: '파리바게트',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
      ],
      'FEMALE-MANY_WISH': [
        {
          id: 6,
          name: '위시캣 케이크',
          price: {
            basicPrice: 120000,
            sellingPrice: 96000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250415150001_bac62e3d78c743b0bf728c6054d4612c.jpg',
          brandInfo: {
            id: 6,
            name: '파리바게트',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
      ],
      'FEMALE-MANY_RECEIVE': [
        {
          id: 7,
          name: '떠먹는 화이트 케이크',
          price: {
            basicPrice: 80000,
            sellingPrice: 60000,
            discountRate: 25,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250123142412_b3b0a3e8c2e74f928aa5e1531d7d5da4.jpg',
          brandInfo: {
            id: 7,
            name: '파리바게트',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
      ],
      'FEMALE-MANY_WISH_RECEIVE': [
        {
          id: 8,
          name: '치킨 + 콜라',
          price: {
            basicPrice: 200000,
            sellingPrice: 160000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20230419124533_63ae502fedfb4b59b89b87902ef5a6f9.jpg',
          brandInfo: {
            id: 8,
            name: 'BHC',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
          },
        },
      ],
      'MALE-MANY_WISH': [
        {
          id: 9,
          name: '반반콤보웨지감자세트',
          price: {
            basicPrice: 300000,
            sellingPrice: 250000,
            discountRate: 17,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250424150327_bc6e39a3858a4d7f93377326e5196382.jpg',
          brandInfo: {
            id: 9,
            name: '교촌치킨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
          },
        },
      ],
      'MALE-MANY_RECEIVE': [
        {
          id: 10,
          name: '후라이드치킨 + 콜라',
          price: {
            basicPrice: 150000,
            sellingPrice: 120000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20230419125139_ee09cbc00f4d46768c8d913e43d69b02.jpg',
          brandInfo: {
            id: 10,
            name: '교촌치킨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
          },
        },
      ],
      'MALE-MANY_WISH_RECEIVE': [
        {
          id: 11,
          name: '골라먹는 27 큐브',
          price: {
            basicPrice: 250000,
            sellingPrice: 200000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20230310150741_da76dcc1e64f40039f33d0f7c4756bcb.png',
          brandInfo: {
            id: 11,
            name: '베스킨라빈스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182011_da1537baef944ea183edc76482066103.jpg',
          },
        },
      ],
      'TEEN-MANY_WISH': [
        {
          id: 12,
          name: '파인트 아이스크림',
          price: {
            basicPrice: 200000,
            sellingPrice: 160000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20240614175745_88409b7f8d0f400ebbf760948160af02.png',
          brandInfo: {
            id: 12,
            name: '베스킨라빈스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182011_da1537baef944ea183edc76482066103.jpg',
          },
        },
      ],
      'TEEN-MANY_RECEIVE': [
        {
          id: 13,
          name: '애플망고치즈설빙',
          price: {
            basicPrice: 50000,
            sellingPrice: 50000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20211217124737_5c87ae38718141e5bbdf66234a307dce.jpg',
          brandInfo: {
            id: 13,
            name: '설빙',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20250401100421_5864b0f5254645e58e349672af898a01.png',
          },
        },
      ],
      'TEEN-MANY_WISH_RECEIVE': [
        {
          id: 14,
          name: '싱글레귤러 아이스크림',
          price: {
            basicPrice: 120000,
            sellingPrice: 96000,
            discountRate: 20,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20230530175027_4c9210d840ee4985ac41ae41f4a37357.jpg',
          brandInfo: {
            id: 14,
            name: '배스킨라빈스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182011_da1537baef944ea183edc76482066103.jpg',
          },
        },
      ],
    };

    const key = `${targetType}-${rankType}`;
    const products =
      mockDataByCombination[key as keyof typeof mockDataByCombination] || [];

    return HttpResponse.json({
      data: products,
    });
  }),
];
