import { api } from './api';

export interface LoginResult {
  email: string;
  name: string;
  authToken: string;
}

export const postLogin = async (email: string, password: string): Promise<LoginResult> => {
  const res = await api.post('/api/login', { email, password });
  return res.data.data;
};
