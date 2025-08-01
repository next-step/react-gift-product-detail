import type { MockRankingProduct } from '../model/types';

export const mockRankingProducts: MockRankingProduct[] = [
  // 'FEMALE' 필터용 데이터
  {
    id: 9,
    name: '여성을 위한 립스틱',
    brandInfo: { name: '뷰티 브랜드' },
    price: { sellingPrice: 45000 },
    imageURL: 'url9',
    gender: 'FEMALE',
    action: 'MANY_WISH',
  },

  // 'MANY_RECEIVE' 필터용 데이터
  {
    id: 10349024,
    name: '5만원권',
    brandInfo: { name: '성심당' },
    price: { sellingPrice: 50000 },
    imageURL: 'url_sungsimdang',
    gender: 'ALL',
    action: 'MANY_RECEIVE',
  },

  // 기본 'ALL', 'MANY_WISH' 데이터
  {
    id: 11477185,
    name: '스트로베리 요거트 생크림',
    price: { sellingPrice: 29000 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250408081816_d201654a475e46bd8a480849de51ea30.jpg',
    brandInfo: { name: '뚜레쥬르' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11526708,
    name: '떠먹는 티라미수 + 아메리카노 R 2잔',
    price: { sellingPrice: 16200 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250324154718_23d0ce897922417e83a7ac72ecfadca8.jpg',
    brandInfo: { name: '투썸플레이스' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11169604,
    name: '우유가득 생크림케이크 1호',
    price: { sellingPrice: 33500 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250421155731_3de0cb1b4e994aac8d450de0b31877bc.jpg',
    brandInfo: { name: '파리바게뜨' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11169673,
    name: '우유듬뿍 생크림케이크(6호)',
    price: { sellingPrice: 49900 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250214140120_cc117535f56949a7aceb76acf62fe5e4.jpg',
    brandInfo: { name: '파리바게뜨' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11526850,
    name: '떠먹는 스트로베리 초콜릿 생크림 + 떠먹는 티라미수 + 아메리카노 R 2잔',
    price: { sellingPrice: 23400 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250324154737_ade537cda4bd4280a726395739280afe.jpg',
    brandInfo: { name: '투썸플레이스' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11725708,
    name: '마이넘버원 초코생크림 조각케이크+마이넘버원 고구마 조각케이크 +아이스 아메리카노 2잔',
    price: { sellingPrice: 19600 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250604103401_d7abb11954e64251b21748784f1ef850.jpg',
    brandInfo: { name: '파리바게뜨' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },
  {
    id: 11518444,
    name: '위시캣 아이냥 케이크(픽업가능)',
    price: { sellingPrice: 33000 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250415150001_bac62e3d78c743b0bf728c6054d4612c.jpg',
    brandInfo: { name: '파리바게뜨' },
    gender: 'ALL',
    action: 'MANY_WISH',
  },

  // 'MALE', 'MANY_WISH_RECEIVE' 데이터
  {
    id: 11430963,
    name: '행운 가득 복 케이크',
    price: { sellingPrice: 28500 },
    imageURL:
      'https://st.kakaocdn.net/product/gift/product/20250401142101_8423c355b7c94bd49464ec91fc30aeaf.jpg',
    brandInfo: { name: '파리바게뜨' },
    gender: 'MALE',
    action: 'MANY_WISH_RECEIVE',
  },
];
