import { apiInstance } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { Auth } from "@/contexts/authContext";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import type { AxiosResponse } from "axios";

interface PostLoginParams {
  email: string;
  password: string;
}

export const postLogin = async (params: PostLoginParams): Promise<AxiosResponse<{ data: Auth }, ApiErrorResponse>> => {
  return await apiInstance.post<{ data: Auth }>(API_ENDPOINTS.LOGIN, params);
};

export default postLogin;
