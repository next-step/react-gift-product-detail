import apiInstance from '@/apis/apiInstance'
import type {
  Product,
  ProductDetail,
  WishInfo,
  HighlightReviewResponse,
} from '@/types/product'

export const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await apiInstance.get(`/api/products/${id}`)
  return data.data
}

export const fetchProductDetail = async (
  id: string
): Promise<ProductDetail> => {
  const { data } = await apiInstance.get(`/api/products/${id}/detail`)
  return data.data
}

export const fetchWishInfo = async (id: string): Promise<WishInfo> => {
  const { data } = await apiInstance.get(`/api/products/${id}/wish`)
  return data.data
}

export const fetchHighlightReview = async (
  id: string
): Promise<HighlightReviewResponse> => {
  const { data } = await apiInstance.get(`/api/products/${id}/highlight-review`)
  return data.data
}
