import { useState } from "react";
import { toast } from "react-toastify";
import { userStorage } from "@/storage/localStorage";
import type { LoginRequestDto, LoginResponseDto } from "@/types/DTO/authDTO";
import type { ApiError } from "@/types/error";
import { useLogin } from "@/hooks/useLogin";

export const useAuth = () => {
  const [user, setUser] = useState<LoginResponseDto | null>(userStorage.get());
  const loginMutation = useLogin();

  const login = async (data: LoginRequestDto) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      userStorage.set(response);
      setUser(response);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "로그인에 실패했습니다.");
      throw error;
    }
  };

  const logout = () => {
    userStorage.clear();
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
  };
};
