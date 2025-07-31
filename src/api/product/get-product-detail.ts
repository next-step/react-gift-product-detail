import { api } from "@/api/api";
import type { ProductDetailResponseBody } from "@/api/product/types";

export const getProductDetail = async (
  productId: number,
): Promise<ProductDetailResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ProductDetailResponseBody>
  >(`/products/${productId}/detail`);
  return response.data;
};
