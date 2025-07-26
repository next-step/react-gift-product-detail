import type { LoginCredentials, User } from '@contexts/AuthContext';
import axiosInstance from './axiosInstance';

export const postLogin = async (body: LoginCredentials): Promise<User> => {
  const res = await axiosInstance.post('/login', body);
  return res.data.data;
};
