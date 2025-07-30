/** @jsxImportSource @emotion/react */
import { Suspense, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import ProductCard from '../Home/components/Shared/RankingCard';
import theme from '../../styles/theme';
import { useThemeProducts } from '../../apis/product';
import { userManagement } from '../Login/contexts/UserManagement';
import { ErrorBoundary } from '../../ErrorBoundary';

const LIMIT = 10;

const ThemeProductListContent = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { user } = userManagement();

  const numericThemeId = Number(themeId);

  useEffect(() => {
    if (!numericThemeId) {
      navigate('/');
    }
  }, [numericThemeId, navigate]);

  const { data, fetchNextPage, hasNextPage } = useThemeProducts(
    numericThemeId,
    LIMIT
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerTarget = observerRef.current;
    if (!observerTarget || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(observerTarget);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  if (allProducts.length === 0) {
    return <div css={emptyStyle}>상품이 없습니다.</div>;
  }

  const handleCardClick = (productId: number) => {
    if (user) {
      navigate(`/detail/${productId}`);
    } else {
      navigate(`/login?redirect=/detail/${productId}`);
    }
  };

  return (
    <>
      <div css={gridStyle}>
        {allProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            css={{ cursor: 'pointer' }}
          >
            <ProductCard
              imageUrl={item.imageUrl}
              brand={item.brand}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>

      <div
        ref={observerRef}
        css={css`
          height: 1px;
          margin-top: ${theme.spacing[10]};
        `}
      />
    </>
  );
};

const ThemeProductList = () => {
  return (
    <ErrorBoundary
      fallback={<div css={errorStyle}>상품 로딩 중 오류가 발생했습니다.</div>}
    >
      <Suspense fallback={<div css={loadingStyle}>로딩 중...</div>}>
        <ThemeProductListContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ThemeProductList;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[4]};
`;

const loadingStyle = css`
  text-align: center;
  margin: ${theme.spacing[4]} 0;
`;

const emptyStyle = css`
  padding: ${theme.spacing[8]};
  margin-top: ${theme.spacing[12]};
  text-align: center;
  color: ${theme.color.gray.gray700};
`;

const errorStyle = css`
  padding: ${theme.spacing[8]};
  margin-top: ${theme.spacing[12]};
  text-align: center;
  color: red;
`;
