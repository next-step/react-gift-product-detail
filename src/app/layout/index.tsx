import { Outlet } from 'react-router-dom';
import { Navigation } from '@/widgets/navigation';
import styled from '@emotion/styled';

const ContentWrapper = styled.main`
  padding-top: 48px;
  max-width: 720px;
  margin: 0 auto;
`;

const Layout = () => {
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default Layout;
