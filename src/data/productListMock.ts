import type { Product } from '@/types/product';

export const productListMock: Product[] = Array.from({ length: 10 }, (_, idx) => ({
  id: idx + 1,
  name: `BBQ 양념치킨+크림치즈볼+콜라1.25L ${idx + 1}`,
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  price: {
    basicPrice: 29_000,
    discountRate: 0,
    sellingPrice: 29_000,
  },
  brandName: 'BBQ',
}));