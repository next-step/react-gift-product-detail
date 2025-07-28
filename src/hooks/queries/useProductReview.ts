import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

interface Review {
  id: string;
  authorName: string;
  content: string;
}

interface ReviewResponse {
  totalCount: number;
  reviews: Review[];
}

export const useProductReview = (productId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.review(productId),
    queryFn: async (): Promise<ReviewResponse> => {
      const { data } = await client.get(
        `/api/products/${productId}/highlight-review`,
      );
      return data.data;
    },
  });
};
