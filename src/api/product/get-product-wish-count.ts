import { api } from "@/api/api";
import type { ProductWishCountResponseBody } from "@/api/product/types";

export const getProductWishCount = async (
  productId: number,
): Promise<ProductWishCountResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ProductWishCountResponseBody>
  >(`/products/${productId}/wish`);
  return response.data;
};
