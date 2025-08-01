import { apiGet, API_PATH } from '@/lib/axios'
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
  const res = await apiGet<ProductSummary>(API_PATH.PRODUCTS_SUMMARY(productId))
  return res
}

export const useProductSummary = (productId: number) => {
  const { data: product } = useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductSummary(productId),
  })

  return product
}
