import { useMutation } from '@tanstack/react-query';
import { login } from '../api/authApi';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};
