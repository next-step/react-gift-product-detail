import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import ProductInfoContent from '@/components/product/ProductInfoContent';
import ProductDescription from '@/components/product/ProductDescription';
import ProductReview from '@/components/product/ProductReview';
import ProductDetailInfo from '@/components/product/ProductDetailInfo';
import {TabContainer,Tab,TabName} from '@/components/product/product.style';

const Product = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const [selectedTab, setSelectedTab] = useState<'description' | 'review' | 'info'>('description');

  return (
    <Layout>
      <NavigationBar />
      <Suspense fallback={<div>로딩 중...</div>}>
        <ProductInfoContent productId={id} />

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

        {selectedTab === 'description' && <ProductDescription productId={id} />}
        {selectedTab === 'review' && <ProductReview productId={id} />}
        {selectedTab === 'info' && <ProductDetailInfo productId={id} />}
      </Suspense>
    </Layout>
  );
};

export default Product;
