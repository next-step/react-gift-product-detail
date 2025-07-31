import type { GiftProduct } from '@/apis/fetchGiftRanking';

type TargetType = 'ALL' | 'FEMALE' | 'TEEN';
type RankType = 'MANY_WISH' | 'MANY_GIFT' | 'MANY_RECEIVE';

type GiftRankingKey = `${TargetType}_${RankType}`;

export const giftRankingMap: Record<GiftRankingKey, GiftProduct[]> = {
  ALL_MANY_WISH: [
    {
      id: 11712379,
      name: '부드러운 고구마 라떼 케이크',
      price: {
        basicPrice: 31000,
        sellingPrice: 26350,
        discountRate: 15,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg',
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
      price: {
        basicPrice: 50000,
        sellingPrice: 50000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20200924101152_16bb00f28a984b03a2efbdb9cec990d1.jpg',
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
      price: {
        basicPrice: 29000,
        sellingPrice: 29000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg',
      brandInfo: {
        id: 27,
        name: '뚜레쥬르',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg',
      },
    },
    {
      id: 11526708,
      name: '떠먹는 티라미수 + 아메리카노 R 2잔',
      price: {
        basicPrice: 16200,
        sellingPrice: 16200,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250324154718_23d0ce897922417e83a7ac72ecfadca8.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11169604,
      name: '우유가득 생크림케이크 1호',
      price: {
        basicPrice: 33500,
        sellingPrice: 33500,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250421155731_3de0cb1b4e994aac8d450de0b31877bc.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11169673,
      name: '우유듬뿍 생크림케이크(6호)',
      price: {
        basicPrice: 49900,
        sellingPrice: 49900,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250214140120_cc117535f56949a7aceb76acf62fe5e4.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11526850,
      name: '떠먹는 스트로베리 초콜릿 생크림 + 떠먹는 티라미수 + 아메리카노 R 2잔',
      price: {
        basicPrice: 23400,
        sellingPrice: 23400,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250324154737_ade537cda4bd4280a726395739280afe.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11725708,
      name: '마이넘버원 초코생크림 조각케이크+마이넘버원 고구마 조각케이크 +아이스 아메리카노 2잔',
      price: {
        basicPrice: 19600,
        sellingPrice: 19600,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250604103401_d7abb11954e64251b21748784f1ef850.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11518444,
      name: '위시캣 아이냥 케이크(픽업가능)',
      price: {
        basicPrice: 33000,
        sellingPrice: 33000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250415150001_bac62e3d78c743b0bf728c6054d4612c.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11527063,
      name: '떠먹는 화이트 스초생',
      price: {
        basicPrice: 7200,
        sellingPrice: 7200,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250123142412_b3b0a3e8c2e74f928aa5e1531d7d5da4.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 10795494,
      name: '도너츠 6개입',
      price: {
        basicPrice: 11400,
        sellingPrice: 11400,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20241014112403_bad0f28b6c814a16aad4bab2d3596fa7.jpg',
      brandInfo: {
        id: 7,
        name: '던킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20200331035637_912cd69641ea4723861dc213f6a0619f',
      },
    },
    {
      id: 10994421,
      name: '춘식이와 파티파티 케이크',
      price: {
        basicPrice: 27000,
        sellingPrice: 27000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20240130160541_9159d29e4af54139bc7ad4da1e588460.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11527042,
      name: '떠먹는 티라미수',
      price: {
        basicPrice: 6800,
        sellingPrice: 6800,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250311111113_d22947f1c95042fcb6c6e7ecd2b5f213.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11527228,
      name: '카페라떼 R',
      price: {
        basicPrice: 5200,
        sellingPrice: 5200,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20231005101943_5dad54f5a2a14663b704f91faa5f75ac.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11527208,
      name: '마이 투썸 하트',
      price: {
        basicPrice: 37000,
        sellingPrice: 37000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250305180202_44ab4285c87948e6898aff497919ad6a.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11720569,
      name: '오리지널 글레이즈드 하프더즌',
      price: {
        basicPrice: 10800,
        sellingPrice: 10800,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20240919141825_bd40874b226c476480fddc80d33d9153.jpg',
      brandInfo: {
        id: 78,
        name: '크리스피크림',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20201022174148_47db523539f443e0a8af6cd038ca25ad.jpeg',
      },
    },
    {
      id: 11527127,
      name: '투썸 오벌 티라미수 (쁘띠) + 아메리카노 R',
      price: {
        basicPrice: 12700,
        sellingPrice: 12700,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250324155205_fe175c1b31124304b11997d2b5253268.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11430963,
      name: '행운 가득 복 케이크',
      price: {
        basicPrice: 28000,
        sellingPrice: 28000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250401142101_8423c355b7c94bd49464ec91fc30aeaf.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
    {
      id: 11607165,
      name: '떠먹는 망고 생크림 케이크',
      price: {
        basicPrice: 6800,
        sellingPrice: 6800,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250429110443_1a3a0db90e944590a5744a39cad6eae4.jpg',
      brandInfo: {
        id: 33,
        name: '투썸플레이스',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
      },
    },
    {
      id: 11170088,
      name: '클래식 벨기에 화이트초코 케이크(배달가능)',
      price: {
        basicPrice: 32900,
        sellingPrice: 32900,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20221227105433_e012276ff96b42fc955ed55c08d60f2a.jpg',
      brandInfo: {
        id: 2,
        name: '파리바게뜨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241127182106_b80d1ec588bd49d985f46db44b827aa2.jpg',
      },
    },
  ],
  ALL_MANY_GIFT: [],
  ALL_MANY_RECEIVE: [],
  FEMALE_MANY_WISH: [],
  FEMALE_MANY_GIFT: [
    {
      id: 11555337,
      name: '황올반+BBQ양념반+콜라1.25L',
      price: {
        basicPrice: 26500,
        sellingPrice: 23500,
        discountRate: 11,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250520135853_db246c8838564b2a8be2052eea9eb1e2.jpg',
      brandInfo: {
        id: 2088,
        name: 'BBQ',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
      },
    },
    {
      id: 10943357,
      name: '뿌링클콤보+콜라1.25L',
      price: {
        basicPrice: 25500,
        sellingPrice: 22500,
        discountRate: 11,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230419095658_3ba18e7a2b514014ba7ec4d4c060f98a.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 6806246,
      name: '허니콤보웨지감자세트',
      price: {
        basicPrice: 30000,
        sellingPrice: 30000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424150638_4a9076e1eda44f3cb74f0b1d7ba0cd5f.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 6806438,
      name: '허니콤보+콜라1.25L',
      price: {
        basicPrice: 26000,
        sellingPrice: 26000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424150621_f98d9eb304024200bc62261f942e3b62.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 11554106,
      name: '황금올리브치킨+콜라1.25L',
      price: {
        basicPrice: 25500,
        sellingPrice: 25500,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20240719153615_c23c0dec2c804952a11c298f5b58ed27.jpg',
      brandInfo: {
        id: 2088,
        name: 'BBQ',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
      },
    },
    {
      id: 10943360,
      name: '후라이드+콜라1.25L',
      price: {
        basicPrice: 22500,
        sellingPrice: 19500,
        discountRate: 13,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230419124533_63ae502fedfb4b59b89b87902ef5a6f9.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 6806241,
      name: '반반콤보웨지감자세트',
      price: {
        basicPrice: 30000,
        sellingPrice: 30000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424150327_bc6e39a3858a4d7f93377326e5196382.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 6806448,
      name: '반반 한마리+콜라1.25L',
      price: {
        basicPrice: 23000,
        sellingPrice: 23000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424150011_7baee6f7b0bb4959bc4d3c5624639eda.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 11396304,
      name: '콰삭킹+콜라1.25L',
      price: {
        basicPrice: 23500,
        sellingPrice: 20500,
        discountRate: 12,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250218094531_60e2314de7484a019cee9efc2f11e957.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 11731589,
      name: '고추바사삭+콜라1.25L',
      price: {
        basicPrice: 22900,
        sellingPrice: 22900,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20240812143912_e9b81fed0c254cad9137f7a915f6967e.jpg',
      brandInfo: {
        id: 9663,
        name: '굽네치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20210802104545_c658cf698ea044a191ad64ffb366512b.png',
      },
    },
    {
      id: 10943363,
      name: '맛초킹+콜라1.25L',
      price: {
        basicPrice: 23500,
        sellingPrice: 20500,
        discountRate: 12,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20240502094444_d84b51d5e50744e8b968a231a092faa6.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 11764279,
      name: '황올반+BBQ양념반+황금알치즈볼(5개)+콜라1.25L',
      price: {
        basicPrice: 31500,
        sellingPrice: 27500,
        discountRate: 12,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250520094758_e55050a687564dfc8081b04b44482d99.jpg',
      brandInfo: {
        id: 2088,
        name: 'BBQ',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
      },
    },
    {
      id: 8213078,
      name: '뿌링클+치즈볼+콜라1.25L',
      price: {
        basicPrice: 29000,
        sellingPrice: 29000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230419124322_0cf4c03e8d924a4ba46d279195395b75.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 11555336,
      name: '황금올리브닭다리+콜라1.25L',
      price: {
        basicPrice: 28500,
        sellingPrice: 25500,
        discountRate: 10,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250520135915_4c143918d06741e1bdd32f8527bd10e4.jpg',
      brandInfo: {
        id: 2088,
        name: 'BBQ',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
      },
    },
    {
      id: 6809141,
      name: '허니콤보+레드콤보+콜라1.25L',
      price: {
        basicPrice: 49000,
        sellingPrice: 49000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424150611_f848ff0f02754cc4a51f2bb31ac2de56.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 7901610,
      name: '크크크치킨&치즈볼&콜라1.25L',
      price: {
        basicPrice: 28400,
        sellingPrice: 28400,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230720144009_12580074bd244cc8a97fed171cea5590.png',
      brandInfo: {
        id: 11250,
        name: '60계치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20201027173819_54d8dfb44b484265b397f77c2d4c8b63.jpg',
      },
    },
    {
      id: 6806592,
      name: '레허반반순살+콜라1.25L',
      price: {
        basicPrice: 26000,
        sellingPrice: 26000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250424145943_0c8500593c7f421dbc1a0ac490fca85c.jpg',
      brandInfo: {
        id: 5031,
        name: '교촌치킨',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20221214133816_fb7c2d6d7c5f4250a29d42104f8f2fe6.jpg',
      },
    },
    {
      id: 8212502,
      name: '골드킹 콤보+뿌링치즈볼+케이준프라이+콜라1.25L',
      price: {
        basicPrice: 36000,
        sellingPrice: 36000,
        discountRate: 0,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230419094846_ed034e26d5ff4273a6bc49c0f4432d02.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 10943361,
      name: 'HOT후라이드+콜라1.25L',
      price: {
        basicPrice: 23500,
        sellingPrice: 20500,
        discountRate: 12,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20230419125139_ee09cbc00f4d46768c8d913e43d69b02.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
    {
      id: 11714781,
      name: '콰삭킹+치즈볼+콜라1.25L',
      price: {
        basicPrice: 29000,
        sellingPrice: 25000,
        discountRate: 13,
      },
      imageURL:
        'https://st.kakaocdn.net/product/gift/product/20250218095410_7edfef2c8426459992983b968f717e19.jpg',
      brandInfo: {
        id: 1893,
        name: 'BHC',
        imageURL:
          'https://st.kakaocdn.net/product/gift/gift_brand/20241202082553_1af93e1ffa3c4497968ab96c6961730e.png',
      },
    },
  ],
  FEMALE_MANY_RECEIVE: [],
  TEEN_MANY_WISH: [],
  TEEN_MANY_GIFT: [],
  TEEN_MANY_RECEIVE: [],
};
