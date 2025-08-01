import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useThemeDetail, useThemeProducts } from '@/api/themes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ProductCard from '@/Components/ProductCard';
import LoadingSpinner from '@/Components/LoadingSpinner';

const HeroSection = styled.div<{ backgroundColor?: string }>`
  background: linear-gradient(135deg, 
    ${({ backgroundColor, theme }) => backgroundColor || theme.colors.gray.gray100} 0%, 
    ${({ theme }) => theme.colors.gray.gray200} 100%);
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.layout.containerPadding};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ThemeCategory = styled.div`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ThemeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const ThemeDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray700};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
`;

const ProductsSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.layout.containerPadding};
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ProductsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
`;

const ProductsCount = styled.span`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const ThemeProducts = () => {
  const { themeId } = useParams();
  const id = themeId ? parseInt(themeId) : 0;

  const { data: themeDetail, isLoading: themeLoading, error: themeError } = useThemeDetail(id);
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    error: productsError, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage 
  } = useThemeProducts(id);

  const { ref: loadMoreRef } = useInfiniteScroll(
    fetchNextPage,
    hasNextPage || false,
    isFetchingNextPage
  );

  if (themeLoading) {
    return (
      <Layout>
        <LoadingContainer>
          <LoadingSpinner message="테마 정보를 불러오는 중..." />
        </LoadingContainer>
      </Layout>
    );
  }

  if (themeError) {
    return (
      <Layout>
        <ErrorMessage>
          테마 정보를 불러오는데 실패했습니다.
        </ErrorMessage>
      </Layout>
    );
  }

  if (!themeDetail) {
    return (
      <Layout>
        <ErrorMessage>
          테마를 찾을 수 없습니다.
        </ErrorMessage>
      </Layout>
    );
  }

  const allProducts = productsData?.pages.flatMap(page => page.list) || [];
  const uniqueProducts = Array.from(new Map(allProducts.map(product => [product.id, product])).values());

  return (
    <Layout>
      <HeroSection backgroundColor={themeDetail.backgroundColor}>
        <ThemeCategory>테마</ThemeCategory>
        <ThemeTitle>{themeDetail.title}</ThemeTitle>
        <ThemeDescription>{themeDetail.description}</ThemeDescription>
      </HeroSection>

      <ProductsSection>
        <ProductsHeader>
          <ProductsTitle>상품 목록</ProductsTitle>
          <ProductsCount>{uniqueProducts.length}개 상품</ProductsCount>
        </ProductsHeader>

        {productsLoading ? (
          <LoadingContainer>
            <LoadingSpinner message="상품을 불러오는 중..." />
          </LoadingContainer>
        ) : productsError ? (
          <ErrorMessage>
            상품을 불러오는데 실패했습니다.
          </ErrorMessage>
        ) : uniqueProducts.length === 0 ? (
          <NoProductsMessage>
            이 테마에 등록된 상품이 없습니다.
          </NoProductsMessage>
        ) : (
          <>
            <ProductsGrid>
              {uniqueProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductsGrid>
            
            {hasNextPage && (
              <div ref={loadMoreRef}>
                {isFetchingNextPage && (
                  <LoadingContainer>
                    <LoadingSpinner message="더 많은 상품을 불러오는 중..." />
                  </LoadingContainer>
                )}
              </div>
            )}
          </>
        )}
      </ProductsSection>
    </Layout>
  );
};

export default ThemeProducts; 