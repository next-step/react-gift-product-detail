import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './apiClient';
import type { ProductInfo } from '@/types';

const productData: ProductInfo[] = [
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
];

export const fetchRankingHandlers = [
  http.get(`${API_BASE_URL}/api/products/ranking`, () => {
    return HttpResponse.json({ data: productData });
  }),
];
