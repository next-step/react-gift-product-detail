import LogoImg from '@/Assets/icons/logo.png';
import LoginButton from '@/components/login/LoginButton';
import {
  Container,
  Logo,
  EmailInput,
  PwInput,
  ErrorMessage,
} from '@/components/login/LoginForm.style';

import { useLoginForm } from '@/hooks/useLoginForm';
import { useLoginHandler } from '@/hooks/useLoginHandler';

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    isValid,
    handleEmailBlur,
    handlePasswordBlur,
  } = useLoginForm();

  const { handleLogin } = useLoginHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    await handleLogin(email, password);
  };

  return (
    <Container>
      <Logo src={LogoImg} alt="로고" />
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <EmailInput
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          autoComplete="off"
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <PwInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          autoComplete="off"
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <LoginButton disabled={!isValid} />
      </form>
    </Container>
  );
};

export default LoginForm;
