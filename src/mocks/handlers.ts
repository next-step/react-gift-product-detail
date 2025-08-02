
import { http, HttpResponse } from 'msw';
import { Product } from '@/api/ranking';

const mockProduct: Product = {
  id: 1,
  name: '테스트 상품',
  imageURL: 'https://via.placeholder.com/150',
  price: {
    basicPrice: 10000,
    sellingPrice: 8000,
    discountRate: 20,
  },
  brandInfo: {
    id: 1,
    name: '테스트 브랜드',
    imageURL: 'https://via.placeholder.com/150',
  },
};

export const handlers = [
  http.get('/api/products/ranking', () => {
    return HttpResponse.json({
      data: [mockProduct],
    });
  }),
];
