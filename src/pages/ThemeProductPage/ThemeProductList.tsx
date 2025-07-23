/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import ProductCard from '../Home/components/Shared/RankingCard';
import theme from '../../styles/theme';
import { useThemeProducts } from '../../apis/product';

const LIMIT = 10;

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const numericThemeId = Number(themeId);

  useEffect(() => {
    if (!numericThemeId) {
      navigate('/');
    }
  }, [numericThemeId, navigate]);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useThemeProducts(numericThemeId, LIMIT);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerTarget = observerRef.current;
    if (!observerTarget || !hasNextPage || isLoading) return;

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
  }, [fetchNextPage, hasNextPage, isLoading]);

  if (isError) {
    console.error('상품 로딩 실패:', error);
    navigate('/');
    return null;
  }

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  if (!isLoading && allProducts.length === 0) {
    return <div css={emptyStyle}>상품이 없습니다.</div>;
  }

  return (
    <>
      <div css={gridStyle}>
        {allProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/order/${item.id}`)}
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
      {isLoading && <div css={loadingStyle}>로딩 중...</div>}
    </>
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
