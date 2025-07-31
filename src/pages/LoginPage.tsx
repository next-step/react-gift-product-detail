import styled from '@emotion/styled';
import { Navbar } from '@/components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { emailInput, passwordInput, isFormValid, handleSubmit } = useLoginForm();
  const { mutate: logIn, isPending } = useLoginMutation();

  const handleLogin = ({ email, password }: { email: string; password: string }) => {
    logIn(
      { email, password },
      {
        onSuccess: () => {
          navigate(from, { replace: true });
        },
      },
    );
  };

  return (
    <>
      <Navbar />
      <Container>
        <Logo>kakao</Logo>
        <Form onSubmit={(e) => handleSubmit(e, handleLogin)}>
          <Input type="email" placeholder="이메일" {...emailInput.bind} error={emailInput.error} />
          <Input
            type="password"
            placeholder="비밀번호"
            {...passwordInput.bind}
            error={passwordInput.error}
          />
          <LoginButton type="submit" disabled={!isFormValid || isPending}>
            로그인
          </LoginButton>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Logo = styled.h1`
  font-size: 34px;
  font-family: 'Kakao', sans-serif;
  margin-bottom: 33px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 13px;
`;

const LoginButton = styled(Button)`
  margin-top: 33px;
`;
