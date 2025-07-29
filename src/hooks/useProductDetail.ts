import { useSuspenseQuery } from '@tanstack/react-query'

import {
  fetchProduct,
  fetchProductDetail,
  fetchWishInfo,
  fetchHighlightReview,
} from '@/apis/product'

export function useProductDetail(productId: string) {
  const { data: product } = useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  })

  const { data: detail } = useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  })

  const { data: wishInfo } = useSuspenseQuery({
    queryKey: ['wish', productId],
    queryFn: () => fetchWishInfo(productId),
  })

  const { data: reviews } = useSuspenseQuery({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  })

  return { product, detail, wishInfo, reviews }
}
