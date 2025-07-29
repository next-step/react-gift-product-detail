import styled from '@emotion/styled';
import { useState, Suspense } from 'react';
import ProductHeader from '@/components/ProductDetailSection/ProductHeader';
import ProductTabSelector from '@/components/ProductDetailSection/ProductTabSelector';
import ProductDescription from '@/components/ProductDetailSection/ProductDescription';
import ProductReviews from '@/components/ProductDetailSection/ProductReviews';
import ProductAnnouncements from '@/components/ProductDetailSection/ProductAnnouncements';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { loading } from '@/components/common/Loading';
import type { ProductDetailTab } from '@/constants/productDetail';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductDetailInfo = () => {
  const [selectedTab, setSelectedTab] = useState<ProductDetailTab>('상품설명');

  const renderTab = () => {
    switch (selectedTab) {
      case '상품설명':
        return (
          <ErrorBoundary
            fallback={
              <FallbackText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</FallbackText>
            }
          >
            <Suspense fallback={loading}>
              <ProductDescription />
            </Suspense>
          </ErrorBoundary>
        );
      case '선물후기':
        return (
          <ErrorBoundary
            fallback={
              <FallbackText>
                {ERROR_MESSAGES.FAILED_TO_LOAD_HIGHLIGHT_REVIEW}
              </FallbackText>
            }
          >
            <Suspense fallback={loading}>
              <ProductReviews />
            </Suspense>
          </ErrorBoundary>
        );
      case '상세정보':
        return (
          <ErrorBoundary
            fallback={
              <FallbackText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</FallbackText>
            }
          >
            <Suspense fallback={loading}>
              <ProductAnnouncements />
            </Suspense>
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <ProductHeader />

      <ProductTabSelector
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />

      <TabContent>{renderTab()}</TabContent>
    </Wrapper>
  );
};

export default ProductDetailInfo;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;

const FallbackText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.disabled};
  padding: ${({ theme }) => theme.spacing[6]};
`;
