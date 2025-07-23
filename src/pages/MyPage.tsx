import styled from "@emotion/styled";
import UserContext from "@src/contexts/UserContext";
import { useLoginRedirection } from "@src/hooks/useLoginRedirection";
import { PATH } from "@src/router/Router";
import theme from "@src/styles/kakaoTheme";
import { useContext } from "react";

function MyPage() {
  const userContext = useContext(UserContext);
  useLoginRedirection(PATH.MY);

  const handleLogout = () => {
    userContext?.authToken.setValue(null);
    userContext?.email.setValue(null);
    userContext?.user.setValue(null);
  };

  return (
    <MyPageWrapper>
      <BoldP>마이 페이지</BoldP>
      <div>{userContext?.user.value}님 안녕하세요!</div>
      <div>이메일 주소는 {userContext?.email.value}입니다.</div>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </MyPageWrapper>
  );
}

const LogoutButton = styled.button`
  background-color: ${theme.colors.gray.gray400};
  border: none;
  padding: 10px;
`;

const BoldP = styled.p`
  font-weight: bold;
`;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 80vh;
`;

export default MyPage;
