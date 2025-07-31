import publicClient from '@/api/clients/publicClient';
import type { LoginPayload, UserInfo } from '@/api/types/auth.dto';

export const authService = async (payload: LoginPayload) => {
  const { data } = await publicClient.post<{ data: UserInfo }>('/api/login', payload);
  const { email, name, authToken } = data.data;
  return {
    email,
    name,
    authToken,
  };
};
