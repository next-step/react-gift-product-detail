import styled from '@emotion/styled';
import { useState } from 'react';
import ProductHeader from '@/components/ProductDetailSection/ProductHeader';
import ProductTabSelector from '@/components/ProductDetailSection/ProductTabSelector';
import ProductDescription from '@/components/ProductDetailSection/ProductDescription';
import ProductReviews from '@/components/ProductDetailSection/ProductReviews';
import ProductAnnouncements from '@/components/ProductDetailSection/ProductAnnouncements';
import WithSuspenseBoundary from '@/components/common/WithSuspenseBoundary';
import type { ProductDetailTab } from '@/constants/productDetail';
import { ERROR_MESSAGES } from '@/constants/validation';

const TAB_COMPONENTS: Record<
  ProductDetailTab,
  { Component: React.FC; errorMessage: string }
> = {
  상품설명: {
    Component: ProductDescription,
    errorMessage: ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS,
  },
  선물후기: {
    Component: ProductReviews,
    errorMessage: ERROR_MESSAGES.FAILED_TO_LOAD_HIGHLIGHT_REVIEW,
  },
  상세정보: {
    Component: ProductAnnouncements,
    errorMessage: ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS_DETAIL,
  },
};

const ProductDetailInfo = () => {
  const [selectedTab, setSelectedTab] = useState<ProductDetailTab>('상품설명');

  const { Component, errorMessage } = TAB_COMPONENTS[selectedTab];

  return (
    <Wrapper>
      <ProductHeader />
      <ProductTabSelector
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <TabContent>
        <WithSuspenseBoundary fallbackMessage={errorMessage}>
          <Component />
        </WithSuspenseBoundary>
      </TabContent>
    </Wrapper>
  );
};

export default ProductDetailInfo;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;
