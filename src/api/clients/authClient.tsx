import { navigate } from '@/utils/navigate';
import axios, { isAxiosError } from 'axios';

const authClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

authClient.interceptors.request.use((config) => {
  const storedUserInfo = sessionStorage.getItem('userInfo');
  const token = storedUserInfo ? JSON.parse(storedUserInfo).authToken : '';
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      navigate('/login');
    }

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      navigate('/main');
    }

    return Promise.reject(error);
  }
);

export default authClient;
