import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ProductData, ProductRankingFilterOption } from "@/types/ProductType";

interface GetProductsRankingParams {
  targetType: ProductRankingFilterOption["targetType"];
  rankType: ProductRankingFilterOption["rankType"];
}

export const getProductsRanking = async (params: GetProductsRankingParams): Promise<ProductData[]> => {
  const response = await apiInstance.get<ProductData[]>(API_ENDPOINTS.PRODUCTS_RANKING, { params });
  return response.data;
};

export default getProductsRanking;
