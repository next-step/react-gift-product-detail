import { Suspense } from 'react';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { ProductOverview } from '@/entities/product/ui';
import { ProductTabs } from '@/widgets';
import { ProductActionGroup } from '@/entities/product/ui/ProductActionGroup';
import { useProductQuery } from './hooks/useProductQuery';

const Product = () => {
  const { productData, wishData, numericProductId } = useProductQuery();

  if (!numericProductId) {
    return null;
  }

  return (
    <ErrorBoundary fallback={<RedirectOnError to={ROUTES.HOME} />}>
      <Suspense fallback={<Loading height="100vh" />}>
        <ProductOverview data={productData} />
        <Suspense fallback={<Loading height="60px" />}>
          <ProductTabs />
        </Suspense>
        <ProductActionGroup wishData={wishData} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Product;
