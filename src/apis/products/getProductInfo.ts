import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ProductData } from "@/types/ProductType";
import { generatePath } from "react-router-dom";

export const getProductInfo = async (params: { productId: string }): Promise<ProductData> => {
  const response = await apiInstance.get<ProductData>(
    generatePath(API_ENDPOINTS.PRODUCT_INFO, { productId: params.productId }),
  );
  return response.data;
};

export default getProductInfo;
