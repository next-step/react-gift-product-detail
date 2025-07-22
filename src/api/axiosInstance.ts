import axios from 'axios';
import { getUserInfo } from '@/utils/storage';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const user = getUserInfo();
  if (user?.authToken) {
    config.headers.Authorization = user.authToken;
  }
  return config;
});

export default axiosInstance;
