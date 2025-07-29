import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useThemeDetail } from '@/hooks/useThemeDetail';
import { useThemeProducts } from '@/api/themes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ProductCard from '@/Components/ProductCard';
import { ERROR_CODES } from '@/constants/errors';

const HeroSection = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  min-height: 300px;
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.gray.gray100};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px ${({ theme }) => theme.spacing.layout.containerPadding};
  text-align: left;
`;

const ThemeCategory = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const ThemeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ThemeDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  max-width: 600px;
  line-height: 1.6;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.red.red700};
`;

const ProductsSection = styled.div`
  padding: 40px ${({ theme }) => theme.spacing.layout.containerPadding};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.grid.gap};
  margin-bottom: 40px;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.grid.gapLarge};
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  text-align: center;
`;

const IntersectionTarget = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9rem;
`;

const ThemeProducts = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { themeDetail, loading: themeLoading, error: themeError } = useThemeDetail(Number(themeId));
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    error: productsError, 
    fetchNextPage, 
    hasNextPage 
  } = useThemeProducts(Number(themeId));
  
  // 모든 페이지의 상품들을 하나의 배열로 합치고 중복 제거
  const allProducts = productsData?.pages.flatMap(page => page.list) || [];
  const products = Array.from(
    new Map(allProducts.map(product => [product.id, product])).values()
  );
  
  const { ref: intersectionRef } = useInfiniteScroll(
    () => fetchNextPage(), 
    hasNextPage || false, 
    productsLoading, 
    productsError
  );

  // 404 에러 시 홈으로 리다이렉트
  useEffect(() => {
    if (themeError?.code === ERROR_CODES.NOT_FOUND || 
        (productsError && 'code' in productsError && productsError.code === ERROR_CODES.NOT_FOUND)) {
      navigate('/', { replace: true });
    }
  }, [themeError, productsError, navigate]);

  const handleProductClick = (productId: number) => {
    navigate(`/order/${productId}`);
  };

  if (themeLoading) {
    return (
      <Layout>
        <LoadingMessage>테마 정보를 불러오는 중...</LoadingMessage>
      </Layout>
    );
  }

  if (themeError && themeError.code !== ERROR_CODES.NOT_FOUND) {
    return (
      <Layout>
        <ErrorMessage>{themeError.message}</ErrorMessage>
      </Layout>
    );
  }

  if (!themeDetail) {
    return (
      <Layout>
        <ErrorMessage>테마 정보가 없습니다.</ErrorMessage>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection backgroundColor={themeDetail.backgroundColor}>
        <ThemeCategory>생일</ThemeCategory>
        <ThemeTitle>{themeDetail.title}</ThemeTitle>
        <ThemeDescription>{themeDetail.description}</ThemeDescription>
      </HeroSection>
      
      <ProductsSection>
        {products.length === 0 && !productsLoading && !productsError ? (
          <EmptyMessage>
            이 테마에 해당하는 상품이 없습니다.
          </EmptyMessage>
        ) : (
          <>
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </ProductsGrid>
            
            {productsLoading && (
              <LoadingIndicator>상품을 불러오는 중...</LoadingIndicator>
            )}
            
            {productsError && (!('code' in productsError) || productsError.code !== ERROR_CODES.NOT_FOUND) && (
              <ErrorMessage>{productsError.message}</ErrorMessage>
            )}
            
            <IntersectionTarget ref={intersectionRef}>
              {hasNextPage ? "더 많은 상품을 불러오는 중..." : "모든 상품을 불러왔습니다"}
            </IntersectionTarget>
          </>
        )}
      </ProductsSection>
    </Layout>
  );
};

export default ThemeProducts; 