import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCard from '@/components/RankingSection/ProductCard';
import CardGrid from '@/components/common/CardGrid';
import { ERROR_MESSAGES } from '@/constants/validation';
import { loading } from '@/components/common/Loading';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import WithApiUi from '@/components/common/WithApiUi';

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { products, isError, hasMore, observerRef } = useThemeProducts(themeId);

  return (
    <Wrapper>
      <WithApiUi
        data={products}
        error={isError}
        loading={loading}
        errorFallback={
          <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</ErrorText>
        }
      >
        <>
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
          {hasMore && <InfiniteScrollTrigger ref={observerRef} />}
        </>
      </WithApiUi>
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

const InfiniteScrollTrigger = styled.div`
  height: 1px;
`;
