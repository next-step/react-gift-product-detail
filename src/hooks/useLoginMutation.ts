import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/LoginApi';

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginApi,
  });
}
