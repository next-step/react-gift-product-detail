import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useProductDetail,
  useProductDetailDetail,
  useProductDetailReview,
} from './useProductDetail';
import * as S from './styles';

const TAB_LIST = [
  { key: 'description', label: '상품설명' },
  { key: 'review', label: '선물후기' },
  { key: 'detail', label: '상세정보' },
] as const;

type TabKey = (typeof TAB_LIST)[number]['key'];

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { product } = useProductDetail();
  const [selectedTab, setSelectedTab] = useState<TabKey>('description');
  const detail = useProductDetailDetail();
  const review = useProductDetailReview();
  if (!product) return <div>상품 정보가 없습니다.</div>;

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
          {selectedTab === 'detail' && <div>상세정보 영역 (임시)</div>}
        </S.TabContent>
      </S.Container>
      <S.ButtonContainer>
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
