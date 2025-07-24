import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/auth";
import type { LoginRequest, LoginResponse } from "@/api/auth";


interface UseLoginOptions {
  onSuccess: (data: LoginResponse) => void;
  onError: (message: string) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginOptions) => {
  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.data?.message || "로그인에 실패했습니다.";
      onError(message);
    },
  });
};
