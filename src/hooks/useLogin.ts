import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import {
  type LoginRequest,
  type LoginResponse,
  login as loginAPI,
} from "@/api/auth";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<LoginResponse, string, LoginRequest>({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      login({
        token: res.authToken,
        name: res.name,
        email: res.email,
      });

      toast.success(ERROR_MESSAGES.LOGIN.SUCCESS);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error ?? ERROR_MESSAGES.LOGIN.FAIL);
    },
  });

  return {
    handleLogin: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
