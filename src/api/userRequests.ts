import type { UserInfoData, UserInfoProps } from '@/types';
import { apiClient } from './apiClient';

export const userRequests = {
  fetchUserInfos: ({ username, password }: UserInfoProps): Promise<UserInfoData> => {
    const data = {
      email: username.value,
      password: password.value,
    };
    return apiClient.post('/api/login', data);
  },
};
