import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { generatePath } from "react-router-dom";

interface GetThemeInfoResponse {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const getThemeInfo = async (params: { themeId: string }): Promise<GetThemeInfoResponse> => {
  const response = await apiInstance.get<GetThemeInfoResponse>(
    generatePath(API_ENDPOINTS.THEME_INFO, { themeId: params.themeId }),
  );
  return response.data;
};

export default getThemeInfo;
