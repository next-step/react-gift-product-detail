import { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ROUTE } from '@/constants/routes';
import Spinner from '@/components/common/Spinner';
import { useThemeDetail } from '@/hooks/useTheme';
import { useThemeProductsInfinite } from '@/hooks/useProduct';
import { toast } from 'react-toastify';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Hero = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ theme }) => theme.spacing.spacing6};
  color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin-top: ${({ theme }) => theme.spacing.spacing2};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
`;

const ThemeName = styled.h2`
  ${({ theme }) => theme.typography.body2Bold};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.spacing.spacing2};
    margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  }

  div {
    ${({ theme }) => theme.typography.body2Regular};
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }

  .brand {
    ${({ theme }) => theme.typography.label1Regular};
    color: ${({ theme }) => theme.colors.semantic.textSub};
    margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  }

  .name {
    ${({ theme }) => theme.typography.label1Regular};
  }

  .price {
    ${({ theme }) => theme.typography.body1Bold};
    margin-top: ${({ theme }) => theme.spacing.spacing1};
  }
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.textSub};
`;

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();

  const hasShownThemeError = useRef(false);
  const hasShownProductError = useRef(false);

  const {
    data: theme,
    isLoading: isThemeLoading,
    isError: isThemeError,
  } = useThemeDetail(Number(themeId));

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useThemeProductsInfinite(Number(themeId));

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isThemeError) {
    if (!hasShownThemeError.current) {
      toast.error('테마 정보를 불러오지 못했습니다.');
      hasShownThemeError.current = true;
    }
    return <Navigate to={ROUTE.MAIN} replace />;
  }

  if (isProductError) {
    if (!hasShownProductError.current) {
      toast.error('상품 정보를 불러오지 못했습니다.');
      hasShownProductError.current = true;
    }
    return <Navigate to={ROUTE.MAIN} replace />;
  }

  if (!themeId || isThemeLoading || isProductLoading) {
    return <Spinner />;
  }

  if (!theme) {
    return null;
  }

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <>
      <Hero bgColor={theme.backgroundColor}>
        <ThemeName>{theme.name}</ThemeName>
        <Title>{theme.title}</Title>
        <Description>{theme.description}</Description>
      </Hero>

      {products.length === 0 ? (
        <EmptyMessage>상품이 없습니다.</EmptyMessage>
      ) : (
        <>
          <ProductGrid>
            {products.map((item) => (
              <ProductCard key={item.id}>
                <img src={item.imageURL} alt={item.name} />
                <div className="brand">{item.brandInfo.name}</div>
                <div className="name">{item.name}</div>
                <div className="price">{item.price.sellingPrice.toLocaleString()} 원</div>
              </ProductCard>
            ))}
          </ProductGrid>

          <div ref={observerRef} style={{ height: '1px' }} />
          {isFetchingNextPage && <Spinner />}
        </>
      )}
    </>
  );
};

export default ThemeProductsPage;
