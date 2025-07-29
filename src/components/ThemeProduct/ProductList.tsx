import { useThemeProducts } from '@/queries/useThemeProducts';
import { ROUTE_PATH } from '@/routes/Routes';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { isLoggedIn } from '@/utils/auth';

const Container = styled.div`
  padding: 16px;
  width: 100%;
`;

const Main = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const Empty = styled.p(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.1875rem',
  color: theme.semanticColors.text.default,
  margin: '0px',
  width: '100%',
  textAlign: 'center',
}));
interface Props {
  themeId: number;
}

const ProductList = ({ themeId }: Props) => {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useThemeProducts(themeId);

  const products = data?.pages.flatMap((p) => p.list) ?? [];
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response?.status === 404) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  }, [isError, error, navigate]);

  if (!isLoading && products.length === 0) {
    return (
      <EmptyContainer>
        <Empty>상품이 없습니다.</Empty>
      </EmptyContainer>
    );
  }
  return (
    <Container>
      <Main>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onClick={() => {
              const target = `${ROUTE_PATH.ORDER}?productId=${p.id}`;

              if (!isLoggedIn()) {
                navigate(`${ROUTE_PATH.LOGIN}?redirect=${encodeURIComponent(target)}`, {
                  replace: true,
                });
                return;
              }

              navigate(target);
            }}
          />
        ))}
      </Main>

      {(isLoading || isFetchingNextPage) && <LoadingSpinner />}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </Container>
  );
};

export default ProductList;
