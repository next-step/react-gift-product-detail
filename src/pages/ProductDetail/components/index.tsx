import styled from '@emotion/styled';
import ProductInfoSection from './ProductInfoSection';

const Wrapper = styled.main`
  width: 100%;
`;

const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

interface BodySectionProps {
  productId: number;
}

const BodySection = ({ productId }: BodySectionProps) => {
  return (
    <>
      <Wrapper>
        <ProductInfoSection productId={productId} />
        <Margin height="8px" />
      </Wrapper>
    </>
  );
};

export default BodySection;
