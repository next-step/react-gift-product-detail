import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"
import type { ProductReviewResponse } from "@/interfaces/ProductReviewResponse"

export function useProductReviews(productId?: string, enabled = false) {
  return useQuery<
    ProductReviewResponse,
    AxiosError,
    ProductReviewResponse["data"]
  >({
    queryKey: ["productReviews", productId],
    queryFn: () =>
      fetchHandler<ProductReviewResponse>(
        `/api/products/${productId}/highlight-review`
      ),
    select: (res) => res.data,
    enabled,
  })
}
