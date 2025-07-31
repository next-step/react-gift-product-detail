import { api } from "@/api/api";
import type { ProductHighlightReviewResponseBody } from "@/api/product/types";

export const getProductHighlightReview = async (
  productId: number,
): Promise<ProductHighlightReviewResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ProductHighlightReviewResponseBody>
  >(`/products/${productId}/highlight-review`);
  return response.data;
};
