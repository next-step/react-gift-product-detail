import styled from '@emotion/styled';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.spacing14};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
