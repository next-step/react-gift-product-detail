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

const ProductTitle = () => {
  return (
    <>
      <Wrapper>
        <Title>상품명</Title>
        <Margin height="8px" />
        <Price>
          가격<span style={{ fontWeight: 400 }}>원</span>
        </Price>
      </Wrapper>
    </>
  );
};

export default ProductTitle;
