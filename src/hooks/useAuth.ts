import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/api/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
