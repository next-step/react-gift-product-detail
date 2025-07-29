import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/Components/layout/Layout";
import { useLoginForm } from "@/hooks/useLoginForm";

const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxxl} 0 ${({ theme }) => theme.spacing.xxl} 0;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 48px;
  letter-spacing: 1px;
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
  @media (min-width: 720px) {
    max-width: 400px;
    gap: ${({ theme }) => theme.spacing.xxxl};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.2rem;
  padding: 18px 0 8px 0;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray.gray400};
  outline: none;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  background: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.colors.semantic.textPlaceholder};
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red.red700};
  font-size: 1.6rem;
  margin-top: -24px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  min-height: 24px;
`;

const LoginButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-size: 1.2rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  padding: 18px 0;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.semantic.kakaoYellowHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.semantic.backgroundDisabled};
    color: ${({ theme }) => theme.colors.semantic.textDisabled};
    cursor: not-allowed;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    email,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    password,
    passwordError,
    handlePasswordChange,
    handlePasswordBlur,
    isFormValid,
    handleSubmit,
    isLoading,
  } = useLoginForm({
    onSuccess: () => {
      const redirect = location.state?.redirect;
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/");
      }
    },
  });

  return (
    <Layout>
      <LoginWrapper>
        <Logo>kakao</Logo>
        <Form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <Input
            type="email"
            placeholder="이메일"
            autoComplete="username"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
          {/* 비밀번호 입력 필드 */}
          <Input
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <ErrorMessage>{passwordError}</ErrorMessage>
          <LoginButton type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </Form>
      </LoginWrapper>
    </Layout>
  );
};

export default Login;
