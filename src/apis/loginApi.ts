import type { LoginCredentials, User } from 'src/types/auth';
import axiosInstance from './axiosInstance';

// 로그인 요청 API
export const postLogin = async (body: LoginCredentials): Promise<User> => {
  const res = await axiosInstance.post('/login', body);
  return res.data.data;
};
