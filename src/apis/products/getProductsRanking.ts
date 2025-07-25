import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { AxiosResponse } from "axios";
import type { ProductData, ProductRankingFilterOption } from "@/types/ProductType";

interface GetProductsRankingParams {
  targetType: ProductRankingFilterOption["targetType"];
  rankType: ProductRankingFilterOption["rankType"];
}

export const getProductsRanking = async (
  params: GetProductsRankingParams,
): Promise<AxiosResponse<{ data: ProductData[] }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductData[] }>(API_ENDPOINTS.PRODUCTS_RANKING, { params });
};

export default getProductsRanking;
