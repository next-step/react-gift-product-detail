import publicClient from '@/api/clients/publicClient';
import type { LoginPayload, UserInfo } from '@/api/types/auth.dto';

export const authService = async (payload: LoginPayload): Promise<UserInfo> => {
  const response = await publicClient.post('/api/login', payload);
  const { data } = response.data;
  const { email, name, authToken } = data;
  return {
    email,
    name,
    authToken,
  };
};
