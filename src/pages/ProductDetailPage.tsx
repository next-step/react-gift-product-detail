import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useProduct } from '@/hooks/useProduct';
import ProductHeader from '@/components/product/ProductHeader';
import ProductTabs from '@/components/product/ProductTabs';
import ProductWishOrderFooter from '@/components/product/ProductWishOrderFooter';
import Spinner from '@/components/common/Spinner';

const PageWrapper = styled.div`
  padding-bottom: 50px;
`;

const TopWrapper = styled.div`
  position: relative;
`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const parsedId = Number(productId);
  const { data: product, isLoading } = useProduct(parsedId);

  if (isLoading || !productId || !product) {
    return <Spinner />;
  }

  return (
    <PageWrapper>
      <TopWrapper>
        <ProductHeader product={product} />
      </TopWrapper>

      <Suspense fallback={<Spinner />}>
        <ProductTabs productId={parsedId} />
      </Suspense>

      <ProductWishOrderFooter productId={parsedId} />
    </PageWrapper>
  );
};

export default ProductDetailPage;
