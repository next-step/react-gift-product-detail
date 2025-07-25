import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchHighlightReview } from "@/api/product";
import type { ProductReviewResponse } from "@/types/product";

export const useProductReview = (productId: number) => {
  const { data: reviewData } = useSuspenseQuery<ProductReviewResponse>({
    queryKey: ["productReview", productId],
    queryFn: () => fetchHighlightReview(productId),
  });

  return {
    totalCount: reviewData.totalCount,
    reviews: reviewData.reviews,
  };
};
