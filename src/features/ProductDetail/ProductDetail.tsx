import { useState } from 'react';
import ProductInfo from './components/ProductInfo';
import TabMenu from './components/TabMenu';
import Description from './components/TabContent/Description';
import DetailInfo from './components/TabContent/DetailInfo';
import FixedBottonBar from './components/FixedBottonBar';
import { useParams } from 'react-router-dom';
import Divider from '@components/common/Divider';
import {
  mockData,
  mockProductDetailInfo,
  mockProductHighlightReview,
} from './mockData';
import styled from '@emotion/styled';
import Reviews from './components/TabContent/Reviews';

const mockProduct = mockData;
const ProductDetailInfo = mockProductDetailInfo;
const reviews = mockProductHighlightReview;

export type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  return (
    <>
      <div>
        <ProductInfo product={mockProduct} />
        <Divider />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <Wrapper>
          {activeTab == 'description' && <Description />}
          {activeTab == 'review' && <Reviews reviewData={reviews} />}
          {activeTab == 'detailInfo' && (
            <DetailInfo productDetailInfo={ProductDetailInfo} />
          )}
        </Wrapper>
      </div>
      <FixedBottonBar />
    </>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  min-height: 400px;
`;
