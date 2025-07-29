import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/layout";
import { getUserName } from "@/utils/auth";
import styled from "@emotion/styled";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@/components/Typography/Typography";

const MyPageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[4]} 0 0
    ${({ theme }) => theme.spacing[4]};
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.gray[300]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.gray[900]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: none;
`;

function MyPage() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const userName = getUserName(user?.email || "");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Layout>
      <MyPageContainer>
        <Typography
          variant="title2Bold"
          as="h2"
          style={{ marginBottom: "1rem" }}
        >
          마이 페이지
        </Typography>
        <Typography variant="body1Regular" style={{ marginBottom: "0.25rem" }}>
          {userName}님 안녕하세요!
        </Typography>
        <Typography variant="body1Regular" style={{ marginBottom: "1.75rem" }}>
          이메일 주소는 {user?.email}입니다.
        </Typography>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </MyPageContainer>
    </Layout>
  );
}

export default MyPage;
