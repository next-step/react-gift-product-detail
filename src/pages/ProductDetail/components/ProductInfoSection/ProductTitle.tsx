import { useProduct } from '@/queries/useProduct';
import { theme } from '@/theme/theme';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  padding: 0px 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;
const Price = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;
const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

interface ProductTitleProps {
  productId: number;
}

const ProductTitle = ({ productId }: ProductTitleProps) => {
  const { data, isLoading, isError } = useProduct(productId);

  if (isLoading || isError || !data) return null;
  return (
    <>
      <Wrapper>
        <Title>{data.name}</Title>
        <Margin height="8px" />
        <Price>
          {data.price.sellingPrice}
          <span style={{ fontWeight: 400 }}>원</span>
        </Price>
      </Wrapper>
    </>
  );
};

export default ProductTitle;
