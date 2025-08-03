import { useParams } from 'react-router-dom';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import Layout from '@/components/Layout';

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();

  return (
    <Layout>
      <NavigationBar />
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ThemeHero themeId={themeId!} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>상품 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ThemeProductList themeId={themeId!} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default ThemeProductPage;
