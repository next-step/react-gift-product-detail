import { useParams } from 'react-router-dom';
import { ThemeInfoBanner } from '@/components/ThemeInfoBanner';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import { ThemeProductItem } from '@/components/ThemeProductItem';
import { Spinner } from '@/components/common/Spinner';
import styled from '@emotion/styled';
import RootLayout from '@/layout/RootLayout';
import { Navbar } from '@/components/Navbar';

export default function ThemePage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { products, isPending, isError, loadMoreRef } = useThemeProducts(
    Number(themeId),
  );

  if (isError) {
    return <div>Error: 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <RootLayout>
      <Navbar />
      <ThemeInfoBanner />
      <Container>
        <ProductGrid>
          {products.map((product) => (
            <ThemeProductItem // 변경된 부분
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageURL: product.imageURL,
                brandName: product.brandInfo.name, // 타입 변환
              }}
            />
          ))}
        </ProductGrid>
      </Container>

      <div ref={loadMoreRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isPending && <Spinner />}
      </div>

      {!isPending && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          상품이 없습니다.
        </div>
      )}
    </RootLayout>
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