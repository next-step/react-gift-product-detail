import { apiGet } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'

export interface ProductSummary {
  id: number
  name: string
  brandName: string
  price: number
  imageURL: string
}

const fetchProductSummary = async (
  productId: number
): Promise<ProductSummary | null> => {
  const res = await apiGet<ProductSummary>(`/products/${productId}/summary`)
  return res
}

export const useProductSummary = (productId: number | null) => {
  if (!productId) return null

  const { data: product } = useSuspenseQuery<ProductSummary | null>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductSummary(productId),
  })

  return product
}
