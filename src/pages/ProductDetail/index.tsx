import styled from '@emotion/styled';
import { ProductDetailHeroSection } from './components/ProductHeroSection';
import { ProductDetailSection } from './components/ProductDetailSection';
import { useNavigate, useParams } from 'react-router';
import { Suspense } from 'react';
import { Spinner } from '@/components/common/Spinner';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '../Routes';
import { ProductDetailAccessoryBar } from './components/ProductAccessoryBar';

const ProductDetailPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Suspense
        fallback={
          <LoadingWrapper>
            <Spinner size='large' color='kakaoBrown' />
          </LoadingWrapper>
        }
      >
        <ErrorBoundary
          onError={(error) => {
            if (error instanceof AxiosError) {
              const message = error.response?.data.data.message;
              if (message) {
                toast.error(message);
              }

              navigate(ROUTE_PATH.HOME);
            }
          }}
        >
          <ProductDetailHeroSection productId={productId} />
        </ErrorBoundary>
        <ErrorBoundary>
          <HorizontalSpacing size='spacing2' color='gray200' />
          <ProductDetailSection productId={productId} />
        </ErrorBoundary>
        <HorizontalSpacing size='spacing16' />
        <ErrorBoundary>
          <ProductDetailAccessoryBar productId={productId} />
        </ErrorBoundary>
      </Suspense>
    </Wrapper>
  );
};

export default ProductDetailPage;

const Wrapper = styled.main`
  width: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
