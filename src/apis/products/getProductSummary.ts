import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { AxiosResponse } from "axios";
import type { ProductSummary } from "@/types/ProductType";
import { generatePath } from "react-router-dom";

export const getProductSummary = async (params: {
  productId: string;
}): Promise<AxiosResponse<{ data: ProductSummary }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductSummary }>(
    generatePath(API_ENDPOINTS.PRODUCT_SUMMARY, { productId: params.productId }),
  );
};

export default getProductSummary;
