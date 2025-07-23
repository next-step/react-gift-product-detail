import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserManagement } from '../contexts/UserManagement';
import { useEmailInput } from './useEmailInput';
import { usePasswordInput } from './usePasswordInput';
import {
  loginUser,
  type LoginRequest,
  type LoginResponse,
} from '../../../apis/auth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useLoginForm = () => {
  const email = useEmailInput();
  const password = usePasswordInput();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = UserManagement();

  const isValid = email.isValid && password.isValid;
  const redirectPath = searchParams.get('redirect') || '/my';

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (resJson) => {
      const { email: userEmail, name, authToken } = resJson.data;
      login({ authToken, email: userEmail, name });
      navigate(redirectPath, { replace: true });
    },
    onError: (err: Error) => {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.data?.message || '잘못된 요청입니다.';
        toast.error(errorMessage);
      } else if (err instanceof TypeError) {
        toast.error('네트워크 오류가 발생했습니다.');
      } else {
        toast.error('서버 오류가 발생했습니다.');
      }
    },
  });

  const goToLogin = () => {
    if (!isValid || mutation.isPending) return;

    mutation.mutate({
      email: email.value,
      password: password.value,
    });
  };

  return {
    email,
    password,
    isValid,
    loading: mutation.isPending,
    goToLogin,
  };
};
