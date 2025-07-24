import { useMutation } from '@tanstack/react-query';
import { loginApi, type LoginRequest, type LoginResponse } from '@/api/LoginApi';

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginApi,
  });
}
