import styled from '@emotion/styled';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';

const ThemesPage = () => {
  return (
    <Container>
      <ErrorBoundary fallback={<div>카드 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<Loading />}>
          <CardSection />
        </Suspense>
      </ErrorBoundary>
      <GridSection />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
