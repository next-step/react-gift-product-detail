import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useProduct } from '@/hooks/useProduct';
import ProductHeader from '@/components/product/ProductHeader';
import ProductTabs from '@/components/product/ProductTabs';
import ProductWishOrderFooter from '@/components/product/ProductWishOrderFooter';
import Spinner from '@/components/common/Spinner';
import ErrorBoundary from '@/components/common/ErrorBoundary';

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

      <Suspense fallback={<Spinner />}>
        <ProductTabs productId={parsedId} />
      </Suspense>

      <ProductWishOrderFooter productId={parsedId} />
    </PageWrapper>
  );
};

const ProductDetailPage = () => (
  <ErrorBoundary fallback={<p>페이지 로딩 중 문제가 발생했습니다.</p>}>
    <Suspense fallback={<Spinner />}>
      <ProductDetailContent />
    </Suspense>
  </ErrorBoundary>
);

export default ProductDetailPage;
