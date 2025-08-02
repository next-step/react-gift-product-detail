import { http, HttpResponse } from 'msw';

export const fetchRankingHandlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get('targetType') ?? 'ALL';
    const rankType = url.searchParams.get('rankType') ?? 'MANY_WISH';

    const validTargetTypes = ['ALL', 'FEMALE', 'MALE', 'TEEN'];
    const validRankTypes = ['MANY_WISH', 'MANY_RECEIVE', 'MANY_WISH_RECEIVE'];

    const isValidTarget = validTargetTypes.includes(targetType);
    const isValidRank = validRankTypes.includes(rankType);

    if (!isValidTarget || !isValidRank) {
      return new HttpResponse(
        JSON.stringify({ message: '잘못된 targetType 또는 rankType입니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return HttpResponse.json({
      data: [
        {
          id: 11526198,
          name: '스트로베리 초콜릿 생크림',
          price: {
            basicPrice: 39000,
            sellingPrice: 39000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250415092419_5f7f5c5c78644f27afe3525fb512ec46.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11169501,
          name: '시그니처 생딸기 우유생크림케이크(배달가능)',
          price: {
            basicPrice: 35900,
            sellingPrice: 35900,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20230201162647_9d2141090c714b4d9fee0ca6e578b205.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 11335051,
          name: '우유 생크림케이크(딸기B타입) 1호',
          price: {
            basicPrice: 30500,
            sellingPrice: 30500,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250421155603_dc8faacb0652489a98dcce97ff299ec2.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 11526210,
          name: '떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R 2잔',
          price: {
            basicPrice: 16600,
            sellingPrice: 16600,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250325092450_14083dee5fd1480989852764aa619966.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11527602,
          name: '피치 생크림 케이크',
          price: {
            basicPrice: 38000,
            sellingPrice: 38000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250410083316_0f643345d41046f79e10fbc847b26aef.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 10346070,
          name: '모바일 금액권 3만원권',
          price: {
            basicPrice: 30000,
            sellingPrice: 30000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20241226093230_a1adad950f744cc2bf6146918fb983fb.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 10346079,
          name: '모바일 금액권 5만원권',
          price: {
            basicPrice: 50000,
            sellingPrice: 50000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20241226093245_d438128e37b34268a23d04f5cb69f236.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 11526224,
          name: '떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R',
          price: {
            basicPrice: 11900,
            sellingPrice: 11900,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250324152020_0bae6b0ff2ad4f4a8737aaa37a575d7e.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11719932,
          name: '우유가득 생크림케이크 2호',
          price: {
            basicPrice: 36900,
            sellingPrice: 31360,
            discountRate: 15,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250428153516_7f4764ea3cb241d9ab2d977b58dd2e31.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 11528161,
          name: '떠먹는 화이트 스초생 + 아메리카노 R 2잔',
          price: {
            basicPrice: 16600,
            sellingPrice: 16600,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250403132318_a95130419a8a47969f30264f7b30205c.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11607990,
          name: '애플망고 빙수 + 아메리카노 R 2잔',
          price: {
            basicPrice: 23900,
            sellingPrice: 23900,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250513140647_f777a6e12e9d4c43b17998e36c105997.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11719704,
          name: '우유 생크림케이크(포도) 1호',
          price: {
            basicPrice: 30500,
            sellingPrice: 25920,
            discountRate: 15,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250519102144_d56bb5cc117046339ba51832a4d211c0.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 11745905,
          name: '애플망고 빙수 + 수박 주스 R + 아메리카노 R',
          price: {
            basicPrice: 25700,
            sellingPrice: 23130,
            discountRate: 10,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250604134025_7045bc178145412db595736e9508d473.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11169457,
          name: '상큼한 블루베리 쉬폰 케이크(배달가능)',
          price: {
            basicPrice: 34900,
            sellingPrice: 34900,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250428153336_9cab752663fa4befa8cee7e4868d81a7.jpg',
          brandInfo: {
            id: 2,
            name: '파리바게뜨',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
          },
        },
        {
          id: 10347333,
          name: '5만원권',
          price: {
            basicPrice: 50000,
            sellingPrice: 50000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250522165745_04023d29c8b044b0afc768ce02b388bc.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11526247,
          name: '떠먹는 아박 + 아메리카노 R',
          price: {
            basicPrice: 11500,
            sellingPrice: 11500,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250324152835_3dac493442f84994a0775079a1a414db.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11526242,
          name: '떠먹는 아박',
          price: {
            basicPrice: 6800,
            sellingPrice: 6800,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20220228135836_41ef8019002b4e488abfb0c14030fa2e.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 10347358,
          name: '3만원권',
          price: {
            basicPrice: 30000,
            sellingPrice: 30000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250522165706_d6544f69bd2941f4b2613181befa2ecc.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11607006,
          name: '망고 생크림 케이크',
          price: {
            basicPrice: 38000,
            sellingPrice: 38000,
            discountRate: 0,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250429105622_d0202a8b6a1349b183ccb10a02c09de3.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
        {
          id: 11767695,
          name: '체리 초콜릿 생크림',
          price: {
            basicPrice: 39000,
            sellingPrice: 35100,
            discountRate: 10,
          },
          imageURL:
            'https://st.kakaocdn.net/product/gift/product/20250610101236_9ae783db284741b0bcab24fb3e798f34.jpg',
          brandInfo: {
            id: 33,
            name: '투썸플레이스',
            imageURL:
              'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
          },
        },
      ],
    });
  }),
];
