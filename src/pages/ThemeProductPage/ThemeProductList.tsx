/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../Home/components/Shared/RankingCard';
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { fetchThemeProducts } from '../../apis/product';

type ProductItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  brand: string;
};

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

  if (!numericThemeId) {
    return null;
  }

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const cursorRef = useRef(cursor);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    cursorRef.current = cursor;
  }, [loading, hasMore, cursor]);

  const loadProducts = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    try {
      const {
        products: newProducts,
        nextCursor,
        hasMoreList,
      } = await fetchThemeProducts(numericThemeId, cursor, LIMIT);

      setProducts((prev) => [
        ...prev,
        ...newProducts.filter(
          (newItem) => !prev.some((existing) => existing.id === newItem.id)
        ),
      ]);
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (e) {
      console.error('상품 로딩 실패:', e);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [numericThemeId, cursor, hasMore, loading, navigate]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const observerTarget = observerRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadProducts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(observerTarget);

    return () => observer.disconnect();
  }, [loadProducts, hasMore, loading]);

  if (!products.length && !loading) {
    return <div css={emptyStyle}>상품이 없습니다.</div>;
  }

  return (
    <>
      <div css={gridStyle}>
        {products.map((item) => (
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
      {loading && <div css={loadingStyle}>로딩 중...</div>}
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
