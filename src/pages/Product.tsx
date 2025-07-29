import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';

import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import ProductInfoContent from '@/components/product/ProductInfoContent';
import ProductDescription from '@/components/product/ProductDescription';
import ProductReview from '@/components/product/ProductReview';
import ProductDetailInfo from '@/components/product/ProductDetailInfo';
import { TabContainer, Tab, TabName } from '@/components/product/product.style';
import WishAndOrderBar from '@/components/product/WishAndOrderBar';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const Product = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const [selectedTab, setSelectedTab] = useState<'description' | 'review' | 'info'>('description');

  return (
    <Layout>
      <NavigationBar />

      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: '20px' }}>상품 정보를 불러오는 중...</div>}>
          <ProductInfoContent productId={id} />
        </Suspense>
      </ErrorBoundary>

      <WishAndOrderBar />

      <TabContainer>
        <Tab active={selectedTab === 'description'} onClick={() => setSelectedTab('description')}>
          <TabName>상품설명</TabName>
        </Tab>
        <Tab active={selectedTab === 'review'} onClick={() => setSelectedTab('review')}>
          <TabName>선물후기</TabName>
        </Tab>
        <Tab active={selectedTab === 'info'} onClick={() => setSelectedTab('info')}>
          <TabName>상세정보</TabName>
        </Tab>
      </TabContainer>

      <ErrorBoundary>
        {selectedTab === 'description' && (
          <Suspense fallback={<div style={{ padding: '20px' }}>설명 로딩 중...</div>}>
            <ProductDescription productId={id} />
          </Suspense>
        )}
        {selectedTab === 'review' && (
          <Suspense fallback={<div style={{ padding: '20px' }}>후기 로딩 중...</div>}>
            <ProductReview productId={id} />
          </Suspense>
        )}
        {selectedTab === 'info' && (
          <Suspense fallback={<div style={{ padding: '20px' }}>상세 정보 로딩 중...</div>}>
            <ProductDetailInfo productId={id} />
          </Suspense>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default Product;
