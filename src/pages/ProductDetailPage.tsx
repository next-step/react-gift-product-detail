// ProductDetailPage.tsx
import Navigation from '@/components/Navigation';
import ProductDetailInfo from '@/components/ProductDetailSection/ProductDetailInfo';
import ProductActionBar from '@/components/ProductDetailSection/ProductActionBar';
import TabPanel from '@/components/common/TabPanel';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductDetailPage = () => {
  return (
    <>
      <Navigation />
      <TabPanel fallbackMessage={ERROR_MESSAGES.LOAD_PRODUCT_FAIL}>
        <ProductDetailInfo />
        <ProductActionBar />
      </TabPanel>
    </>
  );
};

export default ProductDetailPage;
