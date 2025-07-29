import Navigation from '@/components/Navigation';
import ProductDetailInfo from '@/components/ProductDetailSection/ProductDetailInfo';
import ProductActionBar from '@/components/ProductDetailSection/ProductActionBar';
import WithSuspenseBoundary from '@/components/common/WithSuspenseBoundary';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductDetailPage = () => {
  return (
    <>
      <Navigation />
      <WithSuspenseBoundary fallbackMessage={ERROR_MESSAGES.LOAD_PRODUCT_FAIL}>
        <ProductDetailInfo />
        <ProductActionBar />
      </WithSuspenseBoundary>
    </>
  );
};

export default ProductDetailPage;
