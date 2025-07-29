import apiInstance from '@/apis/apiInstance'

export const fetchProduct = async (id: string) => {
  const { data } = await apiInstance.get(`/api/products/${id}`)
  return data.data
}

export const fetchProductDetail = async (id: string) => {
  const { data } = await apiInstance.get(`/api/products/${id}/detail`)
  return data.data
}

export const fetchWishInfo = async (id: string) => {
  const { data } = await apiInstance.get(`/api/products/${id}/wish`)
  return data.data
}

export const fetchHighlightReview = async (id: string) => {
  const { data } = await apiInstance.get(`/api/products/${id}/highlight-review`)
  return data.data
}
