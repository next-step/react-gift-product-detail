import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { generatePath } from "react-router-dom";

export interface getProductWishResponse {
  wishCount: number;
  isWished: boolean;
}

export const getProductWish = async (params: { productId: string }): Promise<getProductWishResponse> => {
  const response = await apiInstance.get<getProductWishResponse>(
    generatePath(API_ENDPOINTS.PRODUCT_WISH, { productId: params.productId }),
  );
  return response.data;
};

export default getProductWish;
