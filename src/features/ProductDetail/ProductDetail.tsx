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
import { useProduct } from '@hooks/useProduct';

export type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  const {
    product,
    productDetailInfo,
    highlightReview,
    productWishInfo,
    wishMutate,
  } = useProduct(id);

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
      <FixedBottonBar
        productWishInfo={productWishInfo}
        wishMutate={wishMutate}
      />
    </>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  min-height: 400px;
  padding-bottom: 56px;
`;
