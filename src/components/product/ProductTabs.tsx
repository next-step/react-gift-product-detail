import styled from '@emotion/styled';
import { useState } from 'react';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';
import ProductDetailInfo from './ProductDetailInfo';

const productTabs = ['description', 'reviews', 'productinfo'] as const;
type TabType = (typeof productTabs)[number];

const TAB_MAP: Record<TabType, string> = {
  description: '상품설명',
  reviews: '선물후기',
  productinfo: '상세정보',
};

interface ProductTabsProps {
  productId: number;
}

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray300};
`;

const TabButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing4};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.title2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Regular.fontWeight};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.semantic.textDefault : theme.colors.semantic.textSub};
  border-bottom: 2px solid
    ${({ selected, theme }) => (selected ? theme.colors.gray.gray1000 : 'transparent')};
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const ProductTabs = ({ productId }: ProductTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('description');

  return (
    <>
      <TabsWrapper>
        {productTabs.map((tab) => (
          <TabButton key={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
            {TAB_MAP[tab]}
          </TabButton>
        ))}
      </TabsWrapper>

      <TabContent>
        {selectedTab === 'description' && <ProductDescription productId={productId} />}
        {selectedTab === 'reviews' && <ProductReviews productId={productId} />}
        {selectedTab === 'productinfo' && <ProductDetailInfo productId={productId} />}
      </TabContent>
    </>
  );
};

export default ProductTabs;
