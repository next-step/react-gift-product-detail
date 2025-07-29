import { useUserInfo } from "@/contexts/UserInfoContext";
import withUser from "@/hoc/withUser";
import styled from "@emotion/styled";

const MyPage = () => {
  const user = useUserInfo();

  if (!user?.email) return null;

  const { name, email } = user || { name: "게스트", email: "" };

  const handleLogout = () => {
    user?.removeUserInfo();
  };

  return (
    <Main>
      <Title>마이 페이지</Title>
      <Content>{name}님 안녕하세요!</Content>
      <Content>이메일 주소는 {email}입니다.</Content>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Main>
  );
};

export default withUser(MyPage);

const Main = styled.main`
  display: block;
  height: calc(100vh - 44px);
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: ${({ theme }) =>
    `${theme.spacing.spacing8} 0 ${theme.spacing.spacing2}`};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const Button = styled.button`
  height: 2.75rem;
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  background-color: ${({ theme }) => theme.colors.gray.gray300};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => `0 ${theme.spacing.spacing3}`};
  margin-top: ${({ theme }) => theme.spacing.spacing6};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray400};
  }
`;
