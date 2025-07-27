import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/routePath';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Nav>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>

        <LogoLink href="/" data-discover="true">
          <LogoImage src="/선물하기.webp" alt="카카오 선물하기 로고" />
        </LogoLink>

        <UserIconLink onClick={() => navigate(ROUTE_PATH.MY)}>
          <UserIcon />
        </UserIconLink>
      </Nav>
    </Container>
  );
};

export default Navigation;

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18L9 12L15 6" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
  z-index: 1000;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.spacing2};
`;

export const LogoLink = styled.a`
  display: flex;
  height: 100%;
`;

export const LogoImage = styled.img`
  height: 100%;
`;

export const BackButton = styled.button`
  display: flex;

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 1.8;
  }
`;

export const UserIconLink = styled.a`
  display: flex;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
`;
