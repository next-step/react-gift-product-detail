import axios from 'axios';
import { ROUTE_PATH } from '@/routes/Router';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    return res.data?.data ?? res.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = ROUTE_PATH.LOGIN;
    }

    return Promise.reject(error);
  }
);
