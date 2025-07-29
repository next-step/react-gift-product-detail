import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ProductSummary } from "@/types/ProductType";
import { generatePath } from "react-router-dom";

export const getProductSummary = async (params: { productId: string }): Promise<ProductSummary> => {
  const response = await apiInstance.get<ProductSummary>(
    generatePath(API_ENDPOINTS.PRODUCT_SUMMARY, { productId: params.productId }),
  );
  return response.data;
};

export default getProductSummary;
