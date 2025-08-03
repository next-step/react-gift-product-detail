import { useState } from "react";
import { useLoginHandler } from "@/hooks/useLoginHandler";
import {
  FormSection,
  InputWrapper,
  Input,
  ErrorMessage,
  LoginButton,
} from "./LoginFormStyles";

interface LoginFormProps {
  onLoginSuccess: (email: string, token: string) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleLogin } = useLoginHandler();

  const validateEmail = (email: string) => {
    if (!email) return "이메일을 입력해주세요.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailError(validateEmail(value));
    if (name === "password") setPasswordError(validatePassword(value));
  };

  const handleSubmit = async () => {
    const emailErr = validateEmail(email);
    const pwErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(pwErr);
    if (emailErr || pwErr) return;

    setIsSubmitting(true);
    try {
      const res = await handleLogin(email, password);
      onLoginSuccess(res.email, res.authToken);
      setEmail("");
      setPassword("");
    } catch (_) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    isSubmitting || !email || !password || !!emailError || !!passwordError;

  return (
    <FormSection>
      <InputWrapper>
        <Input
          name="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          isError={!!emailError}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      </InputWrapper>

      <InputWrapper>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlur}
          isError={!!passwordError}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </InputWrapper>

      <LoginButton onClick={handleSubmit} disabled={isDisabled}>
        로그인
      </LoginButton>
    </FormSection>
  );
};

export default LoginForm;
