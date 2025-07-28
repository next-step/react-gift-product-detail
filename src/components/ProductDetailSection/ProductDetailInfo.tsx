import styled from '@emotion/styled';
import { useState } from 'react';
import ProductHeader from '@/components/ProductDetailSection/ProductHeader';
import ProductTabSelector from '@/components/ProductDetailSection/ProductTabSelector';
import ProductDescription from '@/components/ProductDetailSection/ProductDescription';
import ProductReviews from '@/components/ProductDetailSection/ProductReviews';
import ProductAnnouncements from '@/components/ProductDetailSection/ProductAnnouncements';
import type { ProductDetailTab } from '@/constants/productDetail';

const ProductDetailInfo = () => {
  const [selectedTab, setSelectedTab] = useState<ProductDetailTab>('상품설명');

  return (
    <Wrapper>
      <ProductHeader />

      <ProductTabSelector
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />

      <TabContent>
        {selectedTab === '상품설명' && <ProductDescription />}
        {selectedTab === '선물후기' && <ProductReviews />}
        {selectedTab === '상세정보' && <ProductAnnouncements />}
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
