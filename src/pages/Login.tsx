import useLoginForm from '@/hooks/useLoginForm';
import {
  LoginTitle,
  LoginButton,
  LoginContainer,
  Input,
  ErrorContainer,
  LoginForm,
} from '@/styles/Login.styles';
import { postLogin } from '@/apis/login';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AxiosError } from 'axios';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import { setAccessToken } from '@/apis/apiClient';
import { useMutation } from '@tanstack/react-query';
import type { LoginRequestDTO, LoginResponseDto } from '@/types/DTO/loginDTO';

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const {
    id,
    pw,
    idError,
    pwError,
    isValid,
    handleIdChange,
    handlePwChange,
    handleIdBlur,
    handlePwBlur,
    isValidForm,
  } = useLoginForm();
  const { setLoginInfo } = useContext(LoginInfoContext);

  const loginMutation = useMutation<LoginResponseDto, Error, LoginRequestDTO>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setAccessToken(data.authToken);
      setLoginInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      onLogin();
    },
    onError: (err: Error) => {
      const axiosError = err as AxiosError;
      if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
        toast.error(
          (axiosError.response.data as { message?: string })?.message || '클라이언트 에러가 발생했습니다.',
        );
      } else {
        toast.error('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) return;
    loginMutation.mutate({ email: id, password: pw });
  };

  return (
    <LoginContainer>
      <LoginTitle>KAKAO</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <Input placeholder="이메일" value={id} onChange={handleIdChange} onBlur={handleIdBlur} />
        {idError && <ErrorContainer>{idError}</ErrorContainer>}
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChange}
          onBlur={handlePwBlur}
        />
        {pwError && <ErrorContainer>{pwError}</ErrorContainer>}
        <LoginButton type="submit" $active={isValid}>
          로그인
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
