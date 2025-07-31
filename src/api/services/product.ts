import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants'
import { RankType, TargetType } from '@/api/types'
import type {
  Product,
  ProductSummary,
  ProductDetail,
  ProductHighlightReview,
  ProductWish,
} from '@/api/types'

// * 상품 랭킹 목록 조회하기
export const fetchProductRankList = async (
  targetType: TargetType = TargetType.ALL,
  rankType: RankType = RankType.MANY_WISH,
): Promise<Product[]> => {
  const res = await apiClient.get<{ data: Product[] }>(API_ENDPOINTS.PRODUCTS.RANKING, {
    params: {
      targetType,
      rankType,
    },
  })
  return res.data.data
}

// * 상품 요약 정보 조회
export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const res = await apiClient.get<{ data: ProductSummary }>(
    API_ENDPOINTS.PRODUCTS.SUMMARY(productId),
  )
  return res.data.data
}

// * 상품 기본 정보 조회
export const fetchProductInfo = async (productId: number): Promise<Product> => {
  const res = await apiClient.get<{ data: Product }>(API_ENDPOINTS.PRODUCTS.INFO(productId))
  return res.data.data
}

// * 상품 상세 정보 조회
export const fetchProductDetail = async (productId: number): Promise<ProductDetail> => {
  const res = await apiClient.get<{ data: ProductDetail }>(API_ENDPOINTS.PRODUCTS.DETAIL(productId))
  return res.data.data
}

// * 상품 하이라이트 리뷰 조회
export const fetchProductHighlightReview = async (
  productId: number,
): Promise<ProductHighlightReview> => {
  const res = await apiClient.get<{ data: ProductHighlightReview }>(
    API_ENDPOINTS.PRODUCTS.REVIEW(productId),
  )
  return res.data.data
}

// * 상품 찜 정보 조회
export const fetchProductWish = async (productId: number): Promise<ProductWish> => {
  const res = await apiClient.get<{ data: ProductWish }>(API_ENDPOINTS.PRODUCTS.WISH(productId))
  return res.data.data
}
