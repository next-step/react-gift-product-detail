import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res.data?.data ?? res.data,
  (err) => Promise.reject(err)
);

export const apiGet = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return api.get(url, config).then((res) => res as T);
};

export const apiPost = <TResponse, TRequest = unknown>(
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  return api.post(url, data, config).then((res) => res as TResponse);
};
