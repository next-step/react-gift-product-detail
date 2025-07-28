import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import { useThemeInfoQuery, useThemeProductsQuery } from '@/hooks/useCategoryQuery';
import type { ThemeProductList } from '@/types/category';
import ThemeProductGrid from '@/components/ThemeProductGrid';
import { spinnerStyle } from '@/styles/common';

const heroStyle = (backgroundColor: string) => css({
  background: backgroundColor,
  padding: `${spacing.spacing8} ${spacing.spacing4}`,
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
});

const heroTitleStyle = css({
  ...typography.title1Bold,
  color: 'white',
  marginBottom: spacing.spacing1,
});

const heroDescriptionStyle = css({
  ...typography.body1Regular,
  color: colors.textSub,
  maxWidth: '600px',
});

const loadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
});


import { useState, useEffect } from 'react';

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  // 쿼리 훅 사용
  const { data: themeInfo, isLoading: loading, error } = useThemeInfoQuery(Number(themeId));

  // 페이지네이션 및 상품 누적 관리
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [productLoading, setProductLoading] = useState(false);

  // 상품 불러오기 쿼리
  const {
    data: productData,
  } = useThemeProductsQuery(Number(themeId), page, 10) as { data?: ThemeProductList; isLoading: boolean };

  useEffect(() => {
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

  const handleLoadMore = () => {
    if (!productLoading && hasMore) {
      setProductLoading(true);
      setPage(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div css={spinnerStyle}></div>
          <div>테마 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !themeInfo) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div>테마를 찾을 수 없습니다.</div>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              background: colors.kakaoYellow,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GlobalStyle />
      <Header />
      {/* 히어로 영역 */}
      <section css={heroStyle(themeInfo.backgroundColor)}>
        <h2 css={heroTitleStyle}>{themeInfo.name}</h2>
        <h1 css={heroTitleStyle}>{themeInfo.title}</h1>
        <p css={heroDescriptionStyle}>{themeInfo.description}</p>
      </section>
      {/* 상품 목록 영역 */}
      <ThemeProductGrid
        products={products}
        loading={productLoading && (products.length === 0)}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ThemeProductsPage;