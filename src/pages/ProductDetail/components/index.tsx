import styled from '@emotion/styled';
import ProductInfoSection from './ProductInfoSection';
import { theme } from '@/theme/theme';
import DetailSection from './Details';
import OrderFooter from '@/pages/ProductDetail/components/OrderFooter';
import ErrorBoundary from '@components/common/ErrorBoundary';
import { Suspense } from 'react';
import Skeleton from '@components/common/Skeleton';

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
        <ErrorBoundary fallback={<p style={{ padding: 20 }}>상품 정보를 불러오지 못했습니다.</p>}>
          <Suspense fallback={<Skeleton height={240} />}>
            <ProductInfoSection productId={productId} />
          </Suspense>
        </ErrorBoundary>
        <Fill />
        <ErrorBoundary fallback={<p style={{ padding: 20 }}>상품 정보를 불러오지 못했습니다.</p>}>
          <Suspense fallback={<Skeleton height={240} />}>
            <DetailSection productId={productId} />
          </Suspense>
        </ErrorBoundary>
        <Margin height="64px" />
        <OrderFooter productId={productId} />
      </Wrapper>
    </>
  );
};

export default BodySection;
