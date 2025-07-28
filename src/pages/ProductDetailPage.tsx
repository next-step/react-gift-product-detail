import Navigation from '@/components/Navigation';
import ProductDetailInfo from '@/components/ProductDetailSection/ProductDetailInfo';
import ProductActionBar from '@/components/ProductDetailSection/ProductActionBar';

const ProductDetailPage = () => {
  return (
    <>
      <Navigation />
      <ProductDetailInfo />
      <ProductActionBar />
    </>
  );
};

export default ProductDetailPage;
