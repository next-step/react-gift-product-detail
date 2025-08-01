// src/pages/MyPage.tsx
import styled from '@emotion/styled';
import { Header } from '../components/common/Header';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/common/Typography';

const Wrapper = styled.div`
  padding: 24px;
`;

const InfoBox = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const LogoutButton = styled.button`
  border-radius: 2px;
  border: none;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

function MyPage() {
  const { userInfo, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          <Header />
          <Typography as="h1" variant="title1Bold">
            마이페이지
          </Typography>
          <InfoBox>
            <Typography as="p" variant="body1Regular">
              {userInfo?.name}님 안녕하세요!
            </Typography>
            <Typography as="p" variant="body1Regular">
              이메일 주소는 {userInfo?.email}입니다!
            </Typography>
          </InfoBox>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </>
      ) : (
        <Typography as="p" variant="body1Regular" color="textSub">
          로그인이 필요합니다.
        </Typography>
      )}
    </Wrapper>
  );
}

export default MyPage;
