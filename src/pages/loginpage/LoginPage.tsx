import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import LoginButton from "@/components/common/BaseButton";
import KakaoLogo from "@/components/common/KakaoLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validator";
import type { LoginFormValues } from "@/utils/validator";
import { useApiMutation } from "@/hooks/useApiMutation";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import { HTTP_STATUS } from "@/utils/HTTP_STATUS";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/my";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleApiError = useApiErrorHandler({
    fallbackMessage: "로그인에 실패했습니다. 다시 시도해주세요.",
    customHandler: (statusCode, message) => {
      if (statusCode === HTTP_STATUS.BAD_REQUEST) {
        if (message?.includes("@kakao.com")) {
          return "@kakao.com 이메일 주소만 가능합니다.";
        }
        return message ?? false;
      }
      return false;
    },
  });

  const loginMutation = useApiMutation<{
    email: string;
    name: string;
    authToken: string;
  }>({
    url: API_ENDPOINTS.LOGIN,
    method: "post",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginMutation.mutateAsync(data);

      if (result) {
        const { email, name, authToken } = result;
        if (email && name && authToken) {
          setUserInfo({ email, name, authToken, isLoggedIn: true });
          navigate(redirectTo);
        }
      }
    } catch (err: any) {
      if (err?.response?.status === HTTP_STATUS.BAD_REQUEST) {
        handleApiError(err);
      } else {
        throw err;
      }
    }
  };

  return (
    <Wrapper>
      <Logo>
        <KakaoLogo />
      </Logo>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="이메일" {...register("email")} />
        {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}

        <Input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        {errors.password?.message && (
          <ErrorText>{errors.password.message}</ErrorText>
        )}

        <LoginButton
          color="yellow"
          type="submit"
          label="로그인"
          size="large"
          disabled={!isValid}
        />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 400px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.default};
  border-radius: 16px;
`;

const Logo = styled.div`
  margin-bottom: 20px;

  svg {
    width: 100px;
    height: 100px;
    display: flex;
    margin: 0 auto 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray600};
  padding: 12px 8px;
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-top: -10px;
  margin-bottom: 10px;
`;

export default LoginPage;
