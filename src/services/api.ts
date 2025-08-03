import axios, { type InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/authStore';
import { ApiError } from '@/errors/ApiError';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000, // 10s
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = data?.message || 'API 요청 중 오류가 발생했습니다.';
      return Promise.reject(new ApiError(message, status));
    }
    return Promise.reject(error);
  },
);
