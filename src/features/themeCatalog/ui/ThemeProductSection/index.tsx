import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeProducts } from '../../model/useThemeProducts';
import RankingItemCard from '@/entities/product/ui/RankingItemCard';
import { Loading } from '@/shared/ui';
import type { RankingProduct } from '@/entities/product/model/types';
import * as S from './styles';

interface ThemeProductSectionProps {
  themeId: number;
}

const ThemeProductSection = ({ themeId }: ThemeProductSectionProps) => {
  const navigate = useNavigate();
  const loadingRef = useRef<HTMLDivElement>(null);
  const { products, isLoading, isError, hasMore, fetchNextPage, isFetchingNextPage } = useThemeProducts(themeId);

  const handleProductClick = (product: RankingProduct) => {
    navigate(`/order/${product.id}`);
  };

  useEffect(() => {
    if (!loadingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <S.Section>
        <S.EmptyMessage>해당 테마의 상품이 없습니다.</S.EmptyMessage>
      </S.Section>
    );
  }

  if (isLoading && products.length === 0) {
    return (
      <S.Section>
        <Loading height="400px" />
      </S.Section>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <S.Section>
        <S.EmptyMessage>해당 테마의 상품이 없습니다.</S.EmptyMessage>
      </S.Section>
    );
  }

  return (
    <S.Section>
      <S.Grid>
        {products.map((product) => (
          <RankingItemCard
            key={product.id}
            imageUrl={product.imageURL}
            title={product.name}
            subtitle={product.brandInfo.name}
            price={product.price.sellingPrice}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </S.Grid>

      <div ref={loadingRef} style={{ height: '20px' }}>
        {hasMore && isFetchingNextPage && (
          <S.LoadingMore>
            <Loading height="60px" message="상품을 불러오는 중..." />
          </S.LoadingMore>
        )}
      </div>
    </S.Section>
  );
};

export default ThemeProductSection; 