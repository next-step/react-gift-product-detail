import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { CategoryType } from "@/types/CategoryType";

export const getThemes = async (): Promise<CategoryType[]> => {
  const response = await apiInstance.get<CategoryType[]>(API_ENDPOINTS.THEMES);
  return response.data;
};

export default getThemes;
