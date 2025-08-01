import { useState } from 'react';
import ProductInfo from './components/ProductInfo';
import TabMenu from './components/TabMenu';
import Description from './components/TabContent/Description';
import DetailInfo from './components/TabContent/DetailInfo';
import FixedBottonBar from './components/FixedBottonBar';
import Divider from '@components/common/Divider';
import styled from '@emotion/styled';
import Reviews from './components/TabContent/Reviews';
import { useProduct } from '@hooks/useProduct';
import useRequiredParam from '@hooks/useRequiredParam';

export type ProductDetailTab = 'description' | 'review' | 'detailInfo';
const ProductDetail = () => {
  const id = useRequiredParam('id');
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('description');

  const {
    product,
    productDetailInfo,
    highlightReview,
    productWishInfo,
    wishMutate,
    isPending,
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
        isPending={isPending}
      />
    </>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  min-height: 400px;
  padding-bottom: 56px;
`;
