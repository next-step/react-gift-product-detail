import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useProduct } from '@/hooks/useProduct';
import ProductHeader from '@/components/product/ProductHeader';
import ProductTabs from '@/components/product/ProductTabs';
import ProductWishOrderFooter from '@/components/product/ProductWishOrderFooter';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import PageErrorFallback from '@/components/common/PageErrorFallback';
import ComponentFallback from '@/components/common/ComponentFallback';

const PageWrapper = styled.div`
  padding-bottom: 50px;
`;

const TopWrapper = styled.div`
  position: relative;
`;

const ProductDetailContent = () => {
  const { productId } = useParams();
  const parsedId = Number(productId);
  const { data: product } = useProduct(parsedId);

  return (
    <PageWrapper>
      <TopWrapper>{product && <ProductHeader product={product} />}</TopWrapper>

      <Suspense fallback={<ComponentFallback />}>
        <ProductTabs productId={parsedId} />
      </Suspense>

      <ProductWishOrderFooter productId={parsedId} />
    </PageWrapper>
  );
};

const ProductDetailPage = () => (
  <ErrorBoundary fallback={<PageErrorFallback />}>
    <Suspense fallback={<ComponentFallback />}>
      <ProductDetailContent />
    </Suspense>
  </ErrorBoundary>
);

export default ProductDetailPage;
