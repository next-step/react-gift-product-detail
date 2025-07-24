import styled from "@emotion/styled";
import TheHeader from "@/components/layout/TheHeader";
import LoginForm from "@/components/login/LoginForm";
import KakaoLogo from "@/components/image/KakaoLogo";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  useEffect(() => {
    if (user?.email) {
      const redirectPath = new URLSearchParams(location.search).get("redirect");
      navigate(redirectPath || ROUTE_PATH.HOME, { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <TheHeader />
      <Main>
        <KakaoLogo size={"88px"} />
        <LoginForm />
      </Main>
    </>
  );
};

export default LoginPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 44px);
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;
