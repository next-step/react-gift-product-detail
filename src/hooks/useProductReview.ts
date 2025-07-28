import { useFetch } from "@/hooks/useFetch";
import { API } from "@/constants/api";
import QUERY_KEY from "@/constants/queryKey";

export type Review = {
  id: number;
  content: string;
  authorName: string;
};

type ReviewResponse = {
  totalCount: number;
  reviews: Review[];
};

export function useProductReview(productId?: string) {
  return useFetch<ReviewResponse>({
    queryKey: QUERY_KEY.PRODUCT_REVIEW(productId ?? ""),
    url: API.HIGHLIGHT_REVIEW(productId ?? ""),
    options: {
      enabled: !!productId,
    },
  });
}
