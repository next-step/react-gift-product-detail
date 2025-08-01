import { useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { useAuth } from '@/contexts/AuthContext';
import { spinnerStyle } from '../styles/common';
import { useThemeProductsInfiniteQuery } from '@/hooks/useThemeProductsInfiniteQuery';

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

// 로딩 스피너 스타일 (인라인으로 표시)
const loadingSpinnerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: spacing.spacing4,
  color: colors.textSub,
  gap: spacing.spacing2,
});

interface ThemeProductGridProps {
  themeId: number;
}

const ThemeProductGrid = ({ themeId }: ThemeProductGridProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useThemeProductsInfiniteQuery(themeId);

  // fetchNextPage를 useCallback으로 메모이제이션
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Observer 설정을 useCallback으로 메모이제이션
  const setupObserver = useCallback(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFetchNextPage();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // 조금 더 일찍 트리거되도록 설정
      }
    );

    observer.observe(observerRef.current);
    return observer;
  }, [hasNextPage, isFetchingNextPage, handleFetchNextPage]);

  useEffect(() => {
    const observer = setupObserver();
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [setupObserver]);

  // 상품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    if (isAuthenticated) {
      navigate(`/product/${productId}`);
    } else {
      navigate('/login', { state: { from: `/order/${productId}` } });
    }
  };


  // 모든 상품을 flat하게 배열로 만들기
  const products = data?.pages.flatMap((page: any) => page?.list ?? []);

  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {products?.map((product: any) => (
          <div
            key={product.id}
            css={cardStyle}
            onClick={() => handleProductClick(product.id)}
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
        ))}
      </div>
      
      {/* 추가 로딩 인디케이터 - 기존 콘텐츠 아래에 표시 */}
      {isFetchingNextPage && (
        <div css={loadingSpinnerStyle}>
          <div css={spinnerStyle}></div>
          <span>더 많은 상품을 불러오는 중...</span>
        </div>
      )}
      
      {/* 무한스크롤 트리거 요소 */}
      <div ref={observerRef} style={{ height: '1px' }} />
    </section>
  );
};

export default ThemeProductGrid;