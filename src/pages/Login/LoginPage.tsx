import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Divider from "@/components/common/Divider";
import styled from "@emotion/styled";
import type React from "react";
import useLoginInput from "@/hooks/useLoginInput";
import { useAuth } from "@/contexts/authContext";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import { useMutation } from "@tanstack/react-query";
import postLogin from "@/apis/login/postLogin";
import UnderlineInputField from "@/components/form/UnderlineInputField";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { user, onChange, onBlur, errorMsg } = useLoginInput();
  const { login } = useAuth();

  const { mutate } = useMutation({
    mutationFn: (data: LoginData) => postLogin(data),
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      showFetchErrorToast(error);
    },
  });

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { email: user.id, password: user.password };
    mutate(body);
  };

  const isValidIdAndPassword = user.id.length !== 0 && user.password.length >= 8 && !errorMsg.id && !errorMsg.password;

  return (
    <Container>
      <Content>
        <Logo>kakao</Logo>
        <Form onSubmit={handleLoginSubmit}>
          <UnderlineInputField
            name="id"
            type="email"
            placeholder="이메일"
            onChange={onChange}
            onBlur={onBlur}
            errorMsg={errorMsg.id}
            value={user.id}
            spacing="2px"
          />
          <UnderlineInputField
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
            onBlur={onBlur}
            errorMsg={errorMsg.password}
            value={user.password}
            spacing="2px"
          />
          <Divider />
          <Button fullWidth round type="submit" disabled={!isValidIdAndPassword}>
            로그인
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  width: 100%;
  height: calc(100vh - 45px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  height: 3rem;
  text-align: center;
  font: ${({ theme }) => theme.typography.title1Regular};
  font-size: 2rem;
`;
const Form = styled.form`
  max-width: 26rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing4};
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

export default LoginPage;
