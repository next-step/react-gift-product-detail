import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCard from '@/components/RankingSection/ProductCard';
import CardGrid from '@/components/common/CardGrid';
import { ERROR_MESSAGES } from '@/constants/validation';
import { loading } from '@/components/common/Loading';
import { useThemeProducts } from '@/hooks/useThemeProducts';

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { products, isLoading, isError, hasMore, observerRef } =
    useThemeProducts(themeId);

  if (isLoading) return loading;

  if (isError) {
    return <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</ErrorText>;
  }

  if (products.length === 0) {
    return <EmptyText>{ERROR_MESSAGES.NO_PRODUCTS_AVAILABLE}</EmptyText>;
  }

  return (
    <Wrapper>
      <CardGrid>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            {...product}
            rank={index + 1}
            hideRank
          />
        ))}
      </CardGrid>
      {hasMore && <ObserverTarget ref={observerRef} />}
    </Wrapper>
  );
};

export default ThemeProductList;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ErrorText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.red[500]};
  text-align: center;
`;

const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
`;

const ObserverTarget = styled.div`
  height: 1px;
`;
