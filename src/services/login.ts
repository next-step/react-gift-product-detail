import { api } from '@/services/api';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponseBody = {
  email: string;
  name: string;
  authToken: string;
};

export async function logIn(body?: LoginRequestBody) {
  const { data: response } = await api.post<BaseResponse<LoginResponseBody>>('/login', body);
  return response.data;
}
