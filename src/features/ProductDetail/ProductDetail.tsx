import { useState } from 'react';
import ProductInfo from './components/ProductInfo';
import TabMenu from './components/TabMenu';
import Description from './components/TabContent/Description';
import DetailInfo from './components/TabContent/DetailInfo';
import FixedBottonBar from './components/FixedBottonBar';
import { useParams } from 'react-router-dom';
import Divider from '@components/common/Divider';
import styled from '@emotion/styled';
import Reviews from './components/TabContent/Reviews';
import { useQuery } from '@tanstack/react-query';
import {
  productDetailOptions,
  productOptions,
  productReviewOptions,
  productWishOptions,
} from '@queries/product';

export type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  const { data: product } = useQuery(productOptions(id));
  const { data: highlightReview } = useQuery(productReviewOptions(id));
  const { data: productWishInfo } = useQuery(productWishOptions(id));
  const { data: productDetailInfo } = useQuery(productDetailOptions(id));

  if (!product || !highlightReview || !productDetailInfo || !productWishInfo)
    return <div>데이터 전송 오류 발생</div>;

  return (
    <>
      <div>
        <ProductInfo product={product} />
        <Divider />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <Wrapper>
          {activeTab == 'description' && (
            <Description description={productDetailInfo.description} />
          )}
          {activeTab == 'review' && <Reviews reviewData={highlightReview} />}
          {activeTab == 'detailInfo' && (
            <DetailInfo productDetailInfo={productDetailInfo} />
          )}
        </Wrapper>
      </div>
      <FixedBottonBar productWishInfo={productWishInfo} />
    </>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  min-height: 400px;
  padding-bottom: 56px;
`;
