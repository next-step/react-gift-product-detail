import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { generatePath } from "react-router-dom";

interface GetThemeProductsResponse<T> {
  list: T[];
  cursor: number;
  hasMoreList: boolean;
}

interface GetThemeProductsParams {
  themeId: string;
  params: {
    cursor: number;
    limit: number;
  };
}

export const getThemeProducts = async <T>(params: GetThemeProductsParams): Promise<GetThemeProductsResponse<T>> => {
  const response = await apiInstance.get<GetThemeProductsResponse<T>>(
    generatePath(API_ENDPOINTS.THEME_PRODUCTS, { themeId: params.themeId }),
    { params: params.params },
  );
  return response.data;
};

export default getThemeProducts;
