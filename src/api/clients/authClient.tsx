import { navigate } from '@/utils/navigate';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

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
      toast.warn('로그인이 필요합니다.', {
        style: {
          width: '25rem',
        },
      });
      navigate('/');
      navigate('/login');
    }

    if (isAxiosError(error) && error.response?.status === 404) {
      toast.warn('요청 처리 중 오류가 발생했습니다.', {
        style: {
          width: '25rem',
        },
      });
      navigate('/');
      navigate('/');
    }

    return Promise.reject(error);
  }
);

export default authClient;
