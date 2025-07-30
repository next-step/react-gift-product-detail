import { apiInstance } from '@/apis/instance';
import { API_LOGIN_PATH } from './path';
import type { AxiosResponse } from 'axios';
import type { UserInfo } from './type';

export type PostLoginParams = {
  email: string;
  password: string;
};

export type PostLoginResponse = {
  data: UserInfo;
};

export const postLogin = async (
  params: PostLoginParams,
): Promise<AxiosResponse<PostLoginResponse>> => {
  return await apiInstance.post<PostLoginResponse>(API_LOGIN_PATH.base, params);
};
