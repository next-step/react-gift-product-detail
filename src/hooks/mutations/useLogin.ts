import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/auth";
import type { LoginRequest, LoginResponse } from "@/api/auth";


export const useLogin = (
  onSuccess: (data: LoginResponse) => void,
  onError: (message: string) => void
) => {
  return useMutation({
    mutationFn: (form: LoginRequest) => postLogin(form),
    onSuccess,
    onError: (error: any) => {
      const msg =
        error?.response?.data?.data?.message || "로그인 중 오류가 발생했습니다.";
      onError(msg);
    },
  });
};
