import { Suspense } from 'react';
import ProductInfoContent from '@/components/product/ProductInfoContent';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';

const ProductDetail = () => {
  return (
    <Layout>
      <NavigationBar />
      <Suspense fallback={<div>로딩 중...</div>}>
        <ProductInfoContent />
      </Suspense>
    </Layout>
  );
};

export default ProductDetail;
