import styled from '@emotion/styled';
import { Suspense } from 'react';
import Spinner from '@/components/common/Spinner';
import { ErrorBoundary } from '@/ErrorBoundary';
import { useParams } from 'react-router-dom';
import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import ThemeHero from '@/components/theme/ThemeHero';
import ThemeList from '@/components/theme/ThemeList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: #fff;
`;

export default function ThemeListPage() {
  const { themeId } = useParams();

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />

        <ErrorBoundary fallback={<div>테마 정보를 불러오지 못했습니다.</div>}>
          <Suspense fallback={<Spinner />}>
            <ThemeHero themeId={Number(themeId)} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>상품 목록을 불러오지 못했습니다.</div>}>
          <Suspense fallback={<Spinner />}>
            <ThemeList themeId={Number(themeId)} />
          </Suspense>
        </ErrorBoundary>
      </Wrapper>
    </MobileLayout>
  );
}
