import { useState } from 'react';
import type { ProductDetail, ProductReview } from '@/types/product';
import styled from '@emotion/styled';
import { ProductInfoTab } from './ProductInfoTab';
import { ProductReviewTab } from './ProductReviewTab';
import { ProductDescriptionTab } from './ProductDescriptionTab';

interface ProductTabsProps {
  productDetail: ProductDetail;
  productReview: ProductReview;
}

export const ProductTabs = ({ productDetail, productReview }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <Container>
      <TabList>
        <TabButton active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
          상품설명
        </TabButton>
        <TabButton active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          선물후기
        </TabButton>
        <TabButton active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
          상세정보
        </TabButton>
      </TabList>
      <TabContent>
        {activeTab === 'description' && <ProductInfoTab productDetail={productDetail} />}
        {activeTab === 'review' && <ProductReviewTab productReview={productReview} />}
        {activeTab === 'detail' && <ProductDescriptionTab productDetail={productDetail} />}
      </TabContent>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? '#000' : '#888')};
  border-bottom: 2px solid ${({ active }) => (active ? '#000' : 'transparent')};
`;

const TabContent = styled.div`
  margin-top: 16px;
`;