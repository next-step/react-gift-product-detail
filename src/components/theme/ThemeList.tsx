import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useThemeProducts from '@/hooks/useThemeProducts';
import ThemeProductCard from './ProductCard';
import type { Product } from '@/types/Product';

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
  padding: 16px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  ${({ theme }) => theme.typography.body2Regular};
`;

export default function ThemeList() {
  const { themeId } = useParams();
  const parsedId = Number(themeId);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useThemeProducts(parsedId);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  if (!isLoading && products.length === 0) {
    return <EmptyState>상품이 없습니다.</EmptyState>;
  }

  return (
    <>
      <ProductGrid>
        {products.map((product: Product) => (
          <ThemeProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <div ref={ref} style={{ height: 20 }} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </>
  );
}
