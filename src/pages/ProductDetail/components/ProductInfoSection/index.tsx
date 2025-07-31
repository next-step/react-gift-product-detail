import styled from '@emotion/styled';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import { theme } from '@/theme/theme';
import Brand from './Brand';

const Section = styled.section`
  width: 100%;
`;

const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

const Fill = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.semanticColors.background.fill};
`;

const ProductInfoSection = () => {
  return (
    <>
      <Section>
        <ProductImage />
        <Margin height="20px" />
        <ProductTitle />
        <Margin height="16px" />
        <Fill />
        <Margin height="16px" />
        <Brand />
        <Margin height="16px" />
      </Section>
    </>
  );
};

export default ProductInfoSection;
