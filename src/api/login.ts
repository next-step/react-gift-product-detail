import apiClient from '@/api/apiClient';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  authToken: string;
  userName: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/auth/login',
    credentials
  );
  return response.data;
};
