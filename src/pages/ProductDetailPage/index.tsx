import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useProductDetail,
  useProductDetailDetail,
  useProductDetailHeart,
  useProductDetailReview,
  useToggleHeart,
} from './useProductDetail';
import * as S from './styles';
import SuspenseWrapper from '@/components/common/SuspenseWrapper';
import ApiErrorBoundary from '@/components/common/ErrorBoundary';

const TAB_LIST = [
  { key: 'description', label: '상품설명' },
  { key: 'review', label: '선물후기' },
  { key: 'detail', label: '상세정보' },
] as const;

type TabKey = (typeof TAB_LIST)[number]['key'];

const ProductDetailPage: React.FC = () => {
  return (
    <ApiErrorBoundary>
      <SuspenseWrapper>
        <ProductDetailContent />
      </SuspenseWrapper>
    </ApiErrorBoundary>
  );
};

const ProductDetailContent: React.FC = () => {
  const navigate = useNavigate();
  const { product } = useProductDetail();
  const [selectedTab, setSelectedTab] = useState<TabKey>('description');
  const detail = useProductDetailDetail();
  const review = useProductDetailReview();
  const heart = useProductDetailHeart();
  const { toggleHeart } = useToggleHeart();
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const handleHeartClick = () => {
    toggleHeart();
  };

  return (
    <>
      <S.Container>
        <S.Image src={product.imageURL} alt={product.name} />
        <S.ProductInfo>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.price?.sellingPrice.toLocaleString()}원
          </S.ProductPrice>
          <S.Line />
          <S.ProductBrandInfo>
            <S.ProductBrandImage src={product.brandInfo.imageURL} />
            <S.ProductBrand>{product.brandInfo.name}</S.ProductBrand>
          </S.ProductBrandInfo>
        </S.ProductInfo>
      </S.Container>
      <S.BigLine />
      <S.Container>
        <S.TabButtonWrapper>
          {TAB_LIST.map((tab) => (
            <S.TabButton
              key={tab.key}
              active={selectedTab === tab.key}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </S.TabButton>
          ))}
        </S.TabButtonWrapper>
        <S.TabContent>
          {selectedTab === 'description' && detail && (
            <>
              <S.DescriptionWrapper
                dangerouslySetInnerHTML={{ __html: detail.description }}
              />
            </>
          )}
          {selectedTab === 'review' && review && (
            <S.Reviews>
              {review.reviews.map((review) => (
                <S.ReviewWrapper key={review.id}>
                  <S.AuthorName>{review.authorName}</S.AuthorName>
                  <S.ReviewContent>{review.content}</S.ReviewContent>
                </S.ReviewWrapper>
              ))}
            </S.Reviews>
          )}
          {selectedTab === 'detail' && detail && (
            <S.Details>
              {detail.announcements.map((detail) => (
                <S.DetailWrapper key={detail.name}>
                  <S.DetailName>{detail.name}</S.DetailName>
                  <S.DetailValue>{detail.value}</S.DetailValue>
                </S.DetailWrapper>
              ))}
            </S.Details>
          )}
        </S.TabContent>
      </S.Container>
      <S.ButtonContainer>
        <S.Heart onClick={handleHeartClick}>
          <S.HeartIcon liked={heart.isWished} viewBox="0 0 24 24">
            <S.HeartPath d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </S.HeartIcon>
          <S.HeartCount>{heart.wishCount}</S.HeartCount>
        </S.Heart>
        <S.OrderButton
          onClick={() => {
            navigate(`/order/${product.id}`);
          }}
        >
          주문하기
        </S.OrderButton>
      </S.ButtonContainer>
    </>
  );
};

export default ProductDetailPage;
