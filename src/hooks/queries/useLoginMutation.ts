import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { login as loginService } from '@/api/services';
import { toastError } from '@/utils/toast';
import axios from 'axios';
import type { LoginPayload } from '@/types';

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';

  return useMutation({
    mutationFn: ({ email, password }: LoginPayload) => loginService(email, password),
    onSuccess: (data) => {
      const { email, name, authToken } = data;
      login({ email, name }, authToken);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toastError(error.response.data.data.message || '로그인에 실패했습니다.');
      } else {
        toastError('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
