import type { LoginRequest, LoginResponse, LoginError } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { setUserInfo } from "../utils/storage";
import { toast } from "react-toastify";

// 기존 API 함수 (React Query hook에서 사용)
export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  console.log("[API] /api/login 응답:", data);

  if (!response.ok) {
    const error: LoginError = {
      message: data.message || "로그인에 실패했습니다.",
      status: response.status,
    };
    throw error;
  }

  return data;
};

// React Query Hook
export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      
      // UserInfo를 storage에 저장
      const userInfo = {
        authToken: data.data.authToken,
        email: data.data.email,
        name: data.data.name,
      };
      setUserInfo(userInfo);
      
      toast.success("로그인에 성공했습니다!");
    },
    onError: (error: LoginError) => {
      console.error("로그인 실패:", error);
      
      // 4XX 에러 시 Toast로 에러 메시지 표시
      if (error.status && error.status >= 400 && error.status < 500) {
        toast.error(error.message);
      } else {
        toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });

  // 기존 useLogin hook과 호환되는 인터페이스 제공
  return {
    isLoading: mutation.isPending,
    error: mutation.error,
    login: mutation.mutateAsync,
  };
};
