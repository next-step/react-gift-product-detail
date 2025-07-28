import { api } from "@/api/api";
import type { ProductType } from "@/types";

export const getProductInfo = async (
  productId: number,
): Promise<ProductType> => {
  const { data: response } = await api.get<BaseResponse<ProductType>>(
    `/products/${productId}`,
  );
  return response.data;
};
