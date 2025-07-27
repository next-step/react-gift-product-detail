import { navigate } from '@/utils/navigate';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const publicClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 3000,
});

publicClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 404) {
      toast.warn('요청 처리 중 오류가 발생했습니다.', {
        style: {
          width: '25rem',
        },
      });
      navigate('/');
    }

    return Promise.reject(error);
  }
);

export default publicClient;
