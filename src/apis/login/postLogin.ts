import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { Auth } from "@/contexts/authContext";

export interface PostLoginParams {
  email: string;
  password: string;
}

export const postLogin = async (params: PostLoginParams): Promise<Auth> => {
  const response = await apiInstance.post<Auth>(API_ENDPOINTS.LOGIN, params);
  return response.data;
};

export default postLogin;
