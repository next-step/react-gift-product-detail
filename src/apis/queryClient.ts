import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LOGIN_REQUIRED_MESSAGE } from './constants';
import { PATH } from '@/constants/paths';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    toast(LOGIN_REQUIRED_MESSAGE);
    return { shouldRedirect: true, path: PATH.LOGIN };
  }

  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';
  toast.error(errorMessage);

  return { shouldRedirect: false };
};
