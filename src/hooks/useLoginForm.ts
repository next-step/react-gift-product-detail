import { useInput } from "./useInput";
import { useLoginContext } from "./useLoginContext";
import { useLogin } from "../api/auth";
import { z } from "zod";

interface UseLoginFormOptions {
  onSuccess?: () => void;
}

export function useLoginForm(options?: UseLoginFormOptions) {
  const { login } = useLoginContext();
  const { login: loginApi, isLoading } = useLogin();
  
  // Zod 스키마 정의
  const emailSchema = z
    .string()
    .min(1, "ID를 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다.")
    .refine((email) => email.endsWith("@kakao.com"), {
      message: "kakao.com 이메일만 사용 가능합니다."
    });

  const passwordSchema = z
    .string()
    .min(1, "PW를 입력해주세요.")
    .min(8, "PW는 최소 8글자 이상이어야 합니다.");

  const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });
  
  const validateEmail = (value: string) => {
    const result = emailSchema.safeParse(value);
    return result.success ? "" : result.error.errors[0].message;
  };

  const validatePassword = (value: string) => {
    const result = passwordSchema.safeParse(value);
    return result.success ? "" : result.error.errors[0].message;
  };

  const emailInput = useInput("", validateEmail);
  const passwordInput = useInput("", validatePassword);

  const isFormValid =
    validateEmail(emailInput.value) === "" &&
    validatePassword(passwordInput.value) === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Zod 스키마로 전체 폼 검증
    const formData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const validationResult = loginSchema.safeParse(formData);
    
    if (!validationResult.success) {
      // 검증 실패 시 첫 번째 에러 메시지를 이메일 필드에 표시
      const firstError = validationResult.error.errors[0];
      if (firstError.path.includes('email')) {
        emailInput.setError(firstError.message);
      } else if (firstError.path.includes('password')) {
        passwordInput.setError(firstError.message);
      }
      return;
    }

    try {
      // 1. API 요청으로 로그인
      const response = await loginApi(formData);
      
      if (response) {
        // LoginResponse를 UserInfo로 변환
        const userInfo = {
          authToken: response.data.authToken,
          email: response.data.email,
          name: response.data.name,
        };
        
        // 2. Context에 로그인 정보 저장 (스토리지도 함께 저장됨)
        login(userInfo);
        
        // 3. 성공 시 onSuccess 실행
        if (options && options.onSuccess) {
          options.onSuccess();
        }
      }
    } catch (error) {
      // 에러는 useLogin에서 이미 토스트로 처리됨
      console.error("로그인 실패:", error);
    }
  };

  return {
    email: emailInput.value,
    emailError: emailInput.error,
    handleEmailChange: emailInput.handleChange,
    handleEmailBlur: emailInput.handleBlur,

    password: passwordInput.value,
    passwordError: passwordInput.error,
    handlePasswordChange: passwordInput.handleChange,
    handlePasswordBlur: passwordInput.handleBlur,

    isFormValid,
    handleSubmit,
    isLoading,
  };
}
