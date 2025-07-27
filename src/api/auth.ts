import type { LoginRequest, LoginResponse, LoginError } from "../types/auth";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      // 로그인 성공 시 필요한 처리 (예: 토큰 저장, 리다이렉트 등)
    },
    onError: (error: LoginError) => {
      console.error("로그인 실패:", error);
      // 로그인 실패 시 필요한 처리 (예: 에러 메시지 표시 등)
    },
  });
};
