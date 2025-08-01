import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet, API_PATH } from '@/lib/axios'

export interface ProductPrice {
  basicPrice: number
  sellingPrice: number
  discountRate: number
}

export interface BrandInfo {
  id: number
  name: string
  imageURL: string
}

export interface ProductInfo {
  id: number
  name: string
  price: ProductPrice
  imageURL: string
  brandInfo: BrandInfo
}

const fetchProductInfo = async (
  productId: number
): Promise<ProductInfo | null> => {
  const res = await apiGet<ProductInfo>(API_PATH.PRODUCT_INFO(productId))
  return res
}

const useProductInfo = (productId: number) => {
  const { data: ProductInfo } = useSuspenseQuery({
    queryKey: ['productId', productId],
    queryFn: () => fetchProductInfo(productId),
  })

  return ProductInfo
}

export default useProductInfo
