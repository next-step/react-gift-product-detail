import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ProductDetail } from "@/types/ProductType";
import { generatePath } from "react-router-dom";

export const getProductDetail = async (params: { productId: string }): Promise<ProductDetail> => {
  const response = await apiInstance.get<ProductDetail>(
    generatePath(API_ENDPOINTS.PRODUCT_DETAIL, { productId: params.productId }),
  );
  return response.data;
};

export default getProductDetail;
