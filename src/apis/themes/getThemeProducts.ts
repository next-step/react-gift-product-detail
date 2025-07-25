import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { AxiosResponse } from "axios";
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

export const getThemeProducts = async <T>(
  params: GetThemeProductsParams,
): Promise<AxiosResponse<{ data: GetThemeProductsResponse<T> }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: GetThemeProductsResponse<T> }>(
    generatePath(API_ENDPOINTS.THEME_PRODUCTS, { themeId: params.themeId }),
    { params: params.params },
  );
};

export default getThemeProducts;
