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

interface ProductInfoSectionProps {
  productId: number;
}

const ProductInfoSection = ({ productId }: ProductInfoSectionProps) => {
  return (
    <>
      <Section>
        <ProductImage productId={productId} />
        <Margin height="20px" />
        <ProductTitle productId={productId} />
        <Margin height="16px" />
        <Fill />
        <Margin height="16px" />
        <Brand productId={productId} />
        <Margin height="16px" />
      </Section>
    </>
  );
};

export default ProductInfoSection;
