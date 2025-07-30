import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/axios'

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
    `/products/${productId}/highlight-review`
  )
  return res
}

export const useHighlightReview = (productId: number) => {
  const { data: highlightReview } = useSuspenseQuery<HighlightReviewResponse>({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  })
  return highlightReview
}
