import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { AxiosResponse } from "axios";
import { generatePath } from "react-router-dom";

interface GetThemeInfoResponse {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const getThemeInfo = async (params: {
  themeId: string;
}): Promise<AxiosResponse<{ data: GetThemeInfoResponse }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: GetThemeInfoResponse }>(
    generatePath(API_ENDPOINTS.THEME_INFO, { themeId: params.themeId }),
  );
};

export default getThemeInfo;
