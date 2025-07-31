import styled from "@emotion/styled";
import LoginForm from "@/components/login/LoginForm";
import KakaoLogo from "@/components/image/KakaoLogo";
import withoutUser from "@/hoc/withoutUser";
import { wrapper } from "@/utils/wrapper";

const LoginPage = () => {
  return (
    <Main>
      <KakaoLogo size={"88px"} />
      <LoginForm />
    </Main>
  );
};

export default wrapper([withoutUser], LoginPage);

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 44px);
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;
