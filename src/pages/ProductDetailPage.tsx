import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import ProductDetailInfo from '@/components/ProductDetailSection/ProductDetailInfo';
import ProductActionBar from '@/components/ProductDetailSection/ProductActionBar';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import styled from '@emotion/styled';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductDetailPage = () => {
  return (
    <>
      <Navigation />
      <ErrorBoundary
        fallback={<ErrorText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</ErrorText>}
      >
        <Suspense fallback={loading}>
          <ProductDetailInfo />
          <ProductActionBar />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ProductDetailPage;

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.disabled};
  padding: ${({ theme }) => theme.spacing[6]};
`;
