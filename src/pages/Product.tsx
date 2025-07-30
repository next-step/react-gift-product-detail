import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';

import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import ProductInfoContent from '@/components/product/ProductInfoContent';
import ProductDescription from '@/components/product/ProductDescription';
import ProductReview from '@/components/product/ProductReview';
import ProductDetailInfo from '@/components/product/ProductDetailInfo';
import WishAndOrderBar from '@/components/product/WishAndOrderBar';
import ErrorBoundary from '@/components/common/ErrorBoundary';

import { TabContainer, TabContentWrapper, Tab, TabName } from '@/components/product/product.style';

const tabs = [
  { key: 'description', label: '상품설명' },
  { key: 'review', label: '선물후기' },
  { key: 'info', label: '상세정보' },
] as const;

const TabContentMap = {
  description: ProductDescription,
  review: ProductReview,
  info: ProductDetailInfo,
} as const;

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
        {tabs.map(({ key, label }) => (
          <Tab key={key} active={selectedTab === key} onClick={() => setSelectedTab(key)}>
            <TabName>{label}</TabName>
          </Tab>
        ))}
      </TabContainer>

      <ErrorBoundary>
        <TabContentWrapper>
          <Suspense fallback={<div style={{ padding: '20px' }}>탭 콘텐츠 로딩 중...</div>}>
            {(() => {
              const Component = TabContentMap[selectedTab];
              return <Component productId={id} />;
            })()}
          </Suspense>
        </TabContentWrapper>
      </ErrorBoundary>
    </Layout>
  );
};

export default Product;
