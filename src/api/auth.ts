import axiosInstance from './axiosInstance';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  name: string;
  authToken: string;
}

export const loginRequest = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await axiosInstance.post('/login', payload);
  return res.data.data;
};
