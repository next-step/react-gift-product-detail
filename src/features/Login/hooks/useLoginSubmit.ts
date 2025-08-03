import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '@/contexts/UserContext';
import { apiPost } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import type { LoginFormInputs } from '../schema/LoginSchema';

interface LoginResponse {
  email: string;
  name: string;
  authToken: string;
}

export const useLoginSubmit = (redirectPath: string) => {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const submitLogin = async (
    userInfo: LoginFormInputs
  ): Promise<LoginResponse> => {
    return await apiPost<LoginResponse, LoginFormInputs>('/login', {
      email: userInfo.email,
      password: userInfo.password,
    });
  };

  const mutation = useMutation({
    mutationFn: submitLogin,
    onSuccess: (userInfo) => {
      const { email, name, authToken } = userInfo;
      login({ email, nickname: name, authToken });
      navigate(redirectPath, { replace: true });
    },
    onError: (err: unknown) => {
      const message = (
        err as { response?: { data?: { data?: { message?: string } } } }
      )?.response?.data?.data?.message;

      toast.error(message ?? '로그인 중 오류가 발생하였습니다.');
      console.error(err);
    },
  });

  return {
    submitLogin: mutation.mutate,
    ...mutation,
  };
};
