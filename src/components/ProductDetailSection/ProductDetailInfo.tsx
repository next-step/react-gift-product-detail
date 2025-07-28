import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProductInfo } from '@/hooks/useProductInfo';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useHighlightReview } from '@/hooks/useHighlightReview';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';

type Tab = '상품설명' | '선물후기' | '상세정보';
const TAB_LIST: Tab[] = ['상품설명', '선물후기', '상세정보'];

const ProductDetailInfo = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedTab, setSelectedTab] = useState<Tab>('상품설명');

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
      <Image src={product.imageURL} alt={product.name} />
      <Content>
        <Title>{product.name}</Title>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <Brand>
          <BrandLogo
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
          />
          <BrandName>{product.brandInfo.name}</BrandName>
        </Brand>
      </Content>

      <TabList>
        {TAB_LIST.map(tab => (
          <TabButton
            key={tab}
            isSelected={tab === selectedTab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabList>

      <TabContent>
        {selectedTab === '상품설명' && (
          <Description
            dangerouslySetInnerHTML={{ __html: detail.description }}
          />
        )}

        {selectedTab === '선물후기' &&
          (review.reviews.length > 0 ? (
            <>
              <ReviewCount>총 리뷰 수: {review.totalCount}</ReviewCount>
              <ReviewList>
                {review.reviews.map(({ id, authorName, content }) => (
                  <li key={id}>
                    <Reviewer>{authorName}</Reviewer>
                    <ReviewContent>{content}</ReviewContent>
                  </li>
                ))}
              </ReviewList>
            </>
          ) : (
            <EmptyText>아직 등록된 선물 후기가 없습니다.</EmptyText>
          ))}

        {selectedTab === '상세정보' &&
          (detail.announcements?.length ? (
            <InfoList>
              {detail.announcements.map(({ name, value, displayOrder }) => (
                <li key={displayOrder}>
                  <InfoTitle>{name}</InfoTitle>
                  <InfoContent>{value}</InfoContent>
                </li>
              ))}
            </InfoList>
          ) : (
            <EmptyText>상세 정보가 없습니다.</EmptyText>
          ))}
      </TabContent>
    </Wrapper>
  );
};

export default ProductDetailInfo;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.title.title2Bold};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
`;

const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[200]};
`;

const TabButton = styled.button<{ isSelected: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.color.semantic.text.default
      : theme.color.semantic.text.sub};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `2px solid ${theme.color.semantic.text.default}` : 'none'};
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const ReviewCount = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 0;

  li {
    list-style: none;
  }
`;

const Reviewer = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ReviewContent = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text.sub};
  white-space: pre-wrap;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: 0;
`;

const InfoTitle = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
`;

const InfoContent = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text.sub};
  white-space: pre-wrap;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.default};
  padding: ${({ theme }) => theme.spacing[6]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
