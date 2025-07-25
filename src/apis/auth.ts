import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/login', payload);
  return response.data;
}

export const useLoginMutation = (
  onSuccessCallback: (res: LoginResponse) => void
) =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: onSuccessCallback,
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
