import { useState } from "react";
import {
  FormSection,
  InputWrapper,
  Input,
  ErrorMessage,
  LoginButton,
} from "./LoginFormStyles";
import { userStorage } from "@/utils/userStorage";
import { toast } from "react-toastify";
import { useLogin } from "@/hooks/mutations/useLogin";

type Props = {
  onLoginSuccess: (email: string, token: string) => void;
};

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const getValidateEmail = (email: string) => {
    if (!email) return "ID를 입력해주세요.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "ID는 이메일 형식으로 입력해주세요.";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "PW를 입력해주세요.";
    if (password.length < 8) return "PW는 최소 8글자 이상이어야 합니다.";
    return "";
  };

  const isKakaoEmail = (email: string) => {
    return email.endsWith("@kakao.com");
  };

  const { mutate: loginMutate, isPending } = useLogin({
    onSuccess: (data) => {
      userStorage.set(data);
      toast.success("로그인 성공!");
      onLoginSuccess(data.email, data.authToken);
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (emailError) setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      if (passwordError) setPasswordError("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailError(getValidateEmail(value));
    if (name === "password") setPasswordError(validatePassword(value));
  };

  const handleSubmit = () => {
    const emailErr = getValidateEmail(email);
    const pwErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(pwErr);
    if (emailErr || pwErr) return;

    if (!isKakaoEmail(email)) {
      toast.error("@kakao.com 이메일 주소만 가능합니다.");
      return;
    }

    loginMutate({ email, password });
  };

  const disabled = !email || !password || !!emailError || !!passwordError || isPending;

  return (
    <FormSection>
      <InputWrapper>
        <Input
          type="text"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={!!emailError}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      </InputWrapper>

      <InputWrapper>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={!!passwordError}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </InputWrapper>

      <LoginButton onClick={handleSubmit} disabled={disabled}>
        로그인
      </LoginButton>
    </FormSection>
  );
};
