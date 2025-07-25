import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { CategoryType } from "@/types/CategoryType";
import type { AxiosResponse } from "axios";

export const getThemes = async (): Promise<AxiosResponse<{ data: CategoryType[] }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: CategoryType[] }>(API_ENDPOINTS.THEMES);
};

export default getThemes;
