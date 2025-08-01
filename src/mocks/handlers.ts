import { http, HttpResponse } from 'msw'
import type { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  name: '상품 이름',
  imageURL: 'https://via.placeholder.com/150',
  price: {
    basicPrice: 10000,
    sellingPrice: 9000,
    discountRate: 10,
  },
  brandInfo: {
    id: 1,
    name: '브랜드 이름',
    imageURL: 'https://via.placeholder.com/150',
  },
  rank: 1,
}

export const handlers = [
  http.get('/api/products/ranking', () => {
    return HttpResponse.json({
      data: [mockProduct],
    })
  }),
]
