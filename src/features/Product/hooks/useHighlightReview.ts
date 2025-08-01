import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet, API_PATH } from '@/lib/axios'

export interface Review {
  id: string
  authorName: string
  content: string
}

export interface HighlightReviewResponse {
  totalCount: number
  reviews: Review[]
}

const fetchHighlightReview = (
  productId: number
): Promise<HighlightReviewResponse> => {
  const res = apiGet<HighlightReviewResponse>(
    API_PATH.PRODUCT_REVIEW(productId)
  )
  return res
}

export const useHighlightReview = (productId: number) => {
  const { data: highlightReview } = useSuspenseQuery({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  })
  return highlightReview
}
