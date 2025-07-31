import { api } from "@/api/api";
import type { ProductSummaryResponseBody } from "@/api/product/types";

export const getProductSummary = async (
  productId: number,
): Promise<ProductSummaryResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ProductSummaryResponseBody>
  >(`/products/${productId}/summary`);
  return response.data;
};
