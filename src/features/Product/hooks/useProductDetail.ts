import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/axios'

export interface Announcement {
  name: string
  value: string
  displayOrder: number
}

export interface ProductDetail {
  description: string
  announcements: Announcement[]
}

const fetchProductDetail = (productId: number): Promise<ProductDetail> => {
  const res = apiGet<ProductDetail>(`/products/${productId}/detail`)
  return res
}

export const useProductDetail = (productId: number) => {
  const { data: productDetail } = useSuspenseQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  })
  return productDetail
}
