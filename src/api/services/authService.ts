import publicClient from '@/api/clients/publicClient';
import type { LoginPayload } from '@/types/loginPayload';
import type { UserInfo } from '@/types/userInfo';

export const authService = async (payload: LoginPayload): Promise<UserInfo> => {
  const response = await publicClient.post('/api/login', payload);
  return {
    email: response.data.data.email,
    name: response.data.data.name,
    authToken: response.data.data.authToken,
  };
};
