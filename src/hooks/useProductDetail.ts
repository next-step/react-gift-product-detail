import { useSuspenseQuery } from '@tanstack/react-query'
import type {
  Product,
  ProductDetail,
  WishInfo,
  HighlightReviewResponse,
} from '@/types/product'

import {
  fetchProduct,
  fetchProductDetail,
  fetchWishInfo,
  fetchHighlightReview,
} from '@/apis/product'

export function useProductDetail(productId: string) {
  const { data: product } = useSuspenseQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  })

  const { data: detail } = useSuspenseQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  })

  const { data: wishInfo } = useSuspenseQuery<WishInfo>({
    queryKey: ['wish', productId],
    queryFn: () => fetchWishInfo(productId),
  })

  const { data: reviews } = useSuspenseQuery<HighlightReviewResponse>({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  })

  return { product, detail, wishInfo, reviews }
}
