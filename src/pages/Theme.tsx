import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import {
  HeroSection,
  Name,
  Title,
  Description,
  Gap,
  LoadingWrapper,
} from '@/components/theme/TopBanner.style';
import { ProductGrid } from '@/components/theme/ThemeGrid.style';
import { FadeLoader } from 'react-spinners';
import ThemeProductCard from '@/components/theme/ThemeProductCard';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import { useThemeProducts } from '@/hooks/useThemeProducts';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const {
    data: themeInfo,
    isLoading: themeLoading,
    isError: themeError,
  } = useThemeInfo(Number(themeId));

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: productLoading,
  } = useThemeProducts(Number(themeId));

  useEffect(() => {
    if (themeError) navigate('/');
  }, [themeError, navigate]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (themeLoading || productLoading) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#333" />
      </LoadingWrapper>
    );
  }

  if (themeError || !themeInfo) {
    return <p>존재하지 않는 테마입니다.</p>;
  }

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <Layout>
      <NavigationBar />
      <HeroSection bgColor={themeInfo.backgroundColor}>
        <Name>{themeInfo.name}</Name>
        <Gap />
        <Title>{themeInfo.title}</Title>
        <Gap />
        <Description>{themeInfo.description}</Description>
      </HeroSection>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', fontSize: '16px' }}>
          상품이 없습니다.
        </p>
      ) : (
        <ProductGrid>
          {products.map((product, index) => {
            const isLast = index === products.length - 1;
            return (
              <div key={`${product.id}-${index}`} ref={isLast ? lastItemRef : null}>
                <ThemeProductCard product={product} />
              </div>
            );
          })}
        </ProductGrid>
      )}
    </Layout>
  );
};

export default Theme;