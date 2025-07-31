import styled from '@emotion/styled';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const ThemesPage = () => {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <CardSection />
      </Suspense>
      <GridSection />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
