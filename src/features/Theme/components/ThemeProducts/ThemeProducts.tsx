import type { Product } from '@/features/Theme/components/ThemeHero/ThemeTypes';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useThemeProducts } from '@/features/Theme/hooks/useThemeProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import * as S from './ThemeProducts.styles';

interface ThemeProductsProps {
  themeId: number;
  onProductSelect: (product: Product) => void;
}

const ThemeProducts = ({ themeId, onProductSelect }: ThemeProductsProps) => {
  const { products, fetchNextPage, hasMore } = useThemeProducts(themeId);

  const observerRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasMore,
    threshold: 0.5,
    rootMargin: '100px',
  });

  if (products.length === 0) {
    return <S.NoProduct>상품이 없습니다.</S.NoProduct>;
  }

  return (
    <S.Container>
      <ProductCard
        products={products}
        onProductSelect={onProductSelect}
        showToggleButton={false}
        showRank={false}
      />
      {hasMore && <div ref={observerRef} />}
    </S.Container>
  );
};

export default ThemeProducts;
