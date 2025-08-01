import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import ProductPageContent from '../components/ProductPageContent/ProductPageContent';
import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';

const ProductPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ProductPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductPage;
