import React from 'react';
import { css } from '@emotion/react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { useAuth } from '@/contexts/AuthContext';
import { type Product } from '../types/product';
import { spinnerStyle } from '../styles/common';

const sectionStyle = css({ margin: `${spacing.spacing8} 0` });
const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: parseInt(spacing.spacing6),
});
const cardStyle = css({
  background: colors.backgroundDefault,
  borderRadius: 16,
  padding: parseInt(spacing.spacing4),
  boxShadow: '0 2px 8px #0001',
  textAlign: 'center',
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px #0002',
  }
});

const imgStyle = css({ objectFit: 'cover', borderRadius: 12 });
const nameStyle = css({ marginTop: parseInt(spacing.spacing3), ...typography.body2Bold, color: colors.textDefault });
const priceStyle = css({ marginTop: parseInt(spacing.spacing2), ...typography.body2Regular, color: colors.textDefault });
const brandStyle = css({ marginTop: parseInt(spacing.spacing1), ...typography.label2Regular, color: colors.textSub });

const emptyStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
});

import { useThemeProductsQuery } from '@/hooks/useCategoryQuery';
import type { ThemeProductList } from '@/types/category';

interface ThemeProductGridProps {
  themeId: number;
}

const ThemeProductGrid = ({ themeId }: ThemeProductGridProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 페이지네이션 및 상품 누적 관리
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [productLoading, setProductLoading] = React.useState(false);

  // 상품 불러오기 쿼리
  const { data: productData } = useThemeProductsQuery(themeId, page, 10) as { data?: ThemeProductList };

  React.useEffect(() => {
    if (productData) {
      setProducts(prev => {
        const newList = productData.list.filter(
          item => !prev.some(p => p.id === item.id)
        );
        return page === 0 ? productData.list : [...prev, ...newList];
      });
      setHasMore(productData.hasMoreList);
      setProductLoading(false);
    }
  }, [productData, page]);

  // useInfiniteScroll 훅 사용
  const setObserverRef = useInfiniteScroll<HTMLDivElement>({
    loading: productLoading,
    hasMore,
    onLoadMore: () => {
      if (!productLoading && hasMore) {
        setProductLoading(true);
        setPage(prev => prev + 1);
      }
    },
  });

  // 상품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    if (isAuthenticated) {
      navigate(`/product/${productId}`);
    } else {
      navigate('/login', { state: { from: `/order/${productId}` } });
    }
  };

  if (productLoading && products.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div css={spinnerStyle}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section css={sectionStyle}>
        <div css={emptyStyle}>
          <div>등록된 상품이 없습니다.</div>
        </div>
      </section>
    );
  }

  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div
              key={product.id}
              css={cardStyle}
              onClick={() => handleProductClick(product.id)}
              ref={isLast && hasMore ? setObserverRef : undefined}
            >
              <img
                src={product.imageURL}
                alt={product.name}
                width={160}
                height={120}
                css={imgStyle}
              />
              <div css={nameStyle}>{product.name}</div>
              <div css={priceStyle}>{product.price.sellingPrice.toLocaleString()}원</div>
              <div css={brandStyle}>{product.brandInfo.name}</div>
            </div>
          );
        })}
      </div>
      {/* 더보기 버튼은 무한스크롤로 대체, 필요시 유지 가능 */}
    </section>
  );
};

export default ThemeProductGrid;
