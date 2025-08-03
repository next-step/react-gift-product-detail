import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Navbar } from '@/components/Navbar';
import { ThemeInfoBanner } from '@/components/ThemeInfoBanner';
import { ThemeProductItem } from '@/components/ThemeProductItem';
import { Spinner } from '@/components/common/Spinner';
import RootLayout from '@/layout/RootLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useThemeProductsQuery } from '@/hooks/queries/useThemeProductsQuery';
import { useInView } from '@/hooks/useInView';

export default function ThemePage() {
  const { themeId } = useParams<{ themeId: string }>();

  if (!themeId) {
    return <RootLayout><div>잘못된 테마 ID입니다.</div></RootLayout>;
  }

  return (
    <RootLayout>
      <Navbar />
      <ErrorBoundary fallback={<div>테마 정보를 불러오는 데 실패했습니다.</div>}>
        <Suspense fallback={<Spinner />}>
          <ThemePageContent themeId={Number(themeId)} />
        </Suspense>
      </ErrorBoundary>
    </RootLayout>
  );
}

function ThemePageContent({ themeId }: { themeId: number }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useThemeProductsQuery(themeId);

  const { ref } = useInView({
    threshold: 0.5,
    onInView: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const allProducts = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <>
      <ThemeInfoBanner />
      <Container>
        <ProductGrid>
          {allProducts.map((product) => (
            <ThemeProductItem
              key={product.id}
              product={{
                ...product,
                brandName: product.brandInfo.name,
              }}
            />
          ))}
        </ProductGrid>
      </Container>

      <div ref={ref} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isFetchingNextPage && <Spinner />}
      </div>

      {!hasNextPage && allProducts.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          더 이상 상품이 없습니다.
        </div>
      )}

      {allProducts.length === 0 && !isFetchingNextPage && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          상품이 없습니다.
        </div>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 16px;
`;

const ProductGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 8px;
`;
