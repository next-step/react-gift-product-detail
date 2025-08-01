import { useState } from 'react';
import styled from '@emotion/styled';
import type { ProductDetail, ProductHighlightReview } from '@/types/productDetail';
import ProductDetailSection from './ProductDetailSection';
import ProductReviewSection from './ProductReviewSection';
import ProductAnnouncementSection from './ProductAnnouncementSection';

const TabsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.semantic.textDefault : 'transparent'};
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.semantic.textDefault : theme.colors.gray.gray500};
  font-size: 1rem;
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.semantic.textDefault};
  }
`;

const TabContent = styled.div`
  min-height: 200px;
`;

export type TabType = 'description' | 'reviews' | 'details';

interface ProductTabsProps {
  productDetail: ProductDetail;
  reviewData: ProductHighlightReview;
}

const ProductTabs = ({ productDetail, reviewData }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description' as TabType, label: '상품설명' },
    { id: 'reviews' as TabType, label: '선물후기' },
    { id: 'details' as TabType, label: '상세정보' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDetailSection productDetail={productDetail} />;
      case 'reviews':
        return <ProductReviewSection reviewData={reviewData} />;
      case 'details':
        return <ProductAnnouncementSection productDetail={productDetail} />;
      default:
        return null;
    }
  };

  return (
    <TabsContainer>
      <TabList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      
      <TabContent>
        {renderTabContent()}
      </TabContent>
    </TabsContainer>
  );
};

export default ProductTabs; 