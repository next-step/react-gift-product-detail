import styled from '@emotion/styled';
import ProductInfoSection from './ProductInfoSection';
import { theme } from '@/theme/theme';
import DetailSection from './Details';

const Wrapper = styled.main`
  width: 100%;
`;

const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

const Fill = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.semanticColors.background.disabled};
`;

interface BodySectionProps {
  productId: number;
}

const BodySection = ({ productId }: BodySectionProps) => {
  return (
    <>
      <Wrapper>
        <ProductInfoSection productId={productId} />
        <Fill />
        <DetailSection productId={productId} />
        <Margin height="64px" />
      </Wrapper>
    </>
  );
};

export default BodySection;
