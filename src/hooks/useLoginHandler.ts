import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postLogin } from "@/api/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  authToken: string;
}


export const useLoginHandler = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postLogin,
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await mutateAsync({ email, password });
      toast.success("로그인 성공!");
      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.data?.message || "로그인에 실패했습니다.";
      toast.error(message);
      throw new Error(message);
    }
  };

  return {
    handleLogin,
  };
};
