import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProductInfo } from '@/hooks/useProductInfo';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useHighlightReview } from '@/hooks/useHighlightReview';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';
import ProductAnnouncements from './ProductAnnouncements';
import ProductHeader from './ProductHeader';
import ProductTabSelector from './ProductTabSelector';
import type { ProductDetailTab } from '@/constants/productDetail';

const ProductDetailInfo = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedTab, setSelectedTab] = useState<ProductDetailTab>('상품설명');

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProductInfo(productId);

  const {
    data: detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useProductDetail(productId);

  const {
    data: review,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = useHighlightReview(productId);

  const isLoading = isProductLoading || isDetailLoading || isReviewLoading;
  const isError = isProductError || isDetailError || isReviewError;

  if (isLoading) return loading;
  if (isError || !product || !detail || !review) {
    return <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</ErrorText>;
  }

  return (
    <Wrapper>
      <ProductHeader
        imageURL={product.imageURL}
        name={product.name}
        price={product.price.sellingPrice}
        brand={product.brandInfo}
      />

      <ProductTabSelector
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />

      <TabContent>
        {selectedTab === '상품설명' && (
          <ProductDescription html={detail.description} />
        )}
        {selectedTab === '선물후기' && (
          <ProductReviews reviews={review.reviews} />
        )}
        {selectedTab === '상세정보' && (
          <ProductAnnouncements announcements={detail.announcements} />
        )}
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

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.default};
  padding: ${({ theme }) => theme.spacing[6]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
