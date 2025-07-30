import type {
  ProductBasicInfo,
  ProductDetailInfo,
  ProductHighlightReview,
} from 'src/types/product';

export const mockData: ProductBasicInfo = {
  id: 123,
  name: 'BBQ 양념치킨+크림치즈볼+콜라1.25L',
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: 'BBQ',
    imageURL:
      'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
  },
};

export const mockProductDetailInfo: ProductDetailInfo = {
  description:
    '부드러운 고구마 크림과 달콤한 라떼 시럽이 어우러진 프리미엄 케이크입니다.',
  announcements: [
    {
      name: '유통기한',
      value: '제조일로부터 5일',
      displayOrder: 1,
    },
    {
      name: '보관방법',
      value: '냉장 보관 (0~10℃)',
      displayOrder: 2,
    },
    {
      name: '알레르기 유발 성분',
      value: '우유, 계란, 밀',
      displayOrder: 3,
    },
  ],
};

export const mockProductHighlightReview: ProductHighlightReview = {
  totalCount: 3,
  reviews: [
    {
      id: 'rev-001',
      authorName: '케이크마니아',
      content:
        '진짜 고구마 라떼 맛이 나요! 부드럽고 달콤해서 가족들도 다 좋아했어요.',
    },
    {
      id: 'rev-002',
      authorName: '단거킬러',
      content: '디저트 카페에서 파는 케이크보다 훨씬 맛있고 가성비도 좋아요.',
    },
    {
      id: 'rev-003',
      authorName: '디저트러버',
      content:
        '고구마 맛이 진하고 크림도 부드러워서 입에서 녹아요. 재구매 의사 100%!',
    },
  ],
};
