import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThemeInfo, fetchThemeProducts } from '@/api/theme';
import ThemeHeroSection from '@/components/ThemeHeroSection';
import ProductList from '@/components/ProductList';
import type { ThemeInfo } from '@/types/theme';
import type { Product } from '@/types/product';
import Header from '@/components/Header';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

const PageContainer = styled.div`
  width: 100vw;
  max-width: 720px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: 100vh;
`;

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 테마 정보는 기존 방식 유지
  useEffect(() => {
    if (!themeId) return;
    fetchThemeInfo(Number(themeId))
      .then((themeRes) => setTheme(themeRes.data))
      .catch(() => setError('테마 정보를 불러올 수 없습니다.'));
  }, [themeId]);

  // useInfiniteQuery로 상품 목록 무한 스크롤 처리
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    error: queryError,
  } = useInfiniteQuery<
    { list: Product[]; cursor: number; hasMoreList: boolean },
    Error
  >({
    queryKey: ['theme-products', themeId],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchThemeProducts(
        Number(themeId),
        pageParam as number,
        10,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
    initialPageParam: 0,
  });

  // Intersection Observer로 하단 감지 → fetchNextPage
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError || error || queryError)
    return <div>{error || queryError?.message || '에러 발생'}</div>;
  if (!theme) return <div>테마 정보를 찾을 수 없습니다.</div>;

  // 모든 페이지의 상품을 합쳐서 전달
  const products = data?.pages.flatMap((page) => page.list as Product[]) || [];

  return (
    <PageContainer>
      <Header />
      <ThemeHeroSection theme={theme} />
      <ProductList products={products} showRank={false} />
      {isLoading && <div>로딩중...</div>}
      <div ref={observerRef} style={{ height: 1 }} />
      {!hasNextPage && products.length === 0 && <div>상품이 없습니다.</div>}
    </PageContainer>
  );
};

export default ThemeProductPage;
