import styled from '@emotion/styled';
import type { TabType } from './ProductDetailTabs';
import type {
  ProductDetailResponse,
  ProductHighlightReviewResponse,
} from '@/api/types';

interface ProductDetailContentProps {
  activeTab: TabType;
  productDetail: ProductDetailResponse | null | undefined;
  productReview: ProductHighlightReviewResponse | null | undefined;
  isLoadingDetail: boolean;
  isLoadingReview: boolean;
}

const ContentContainer = styled.div`
  background: #fff;
  min-height: 400px;
  padding: 20px 16px;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #868b94;
  padding: 40px 0;
`;

const DescriptionContent = styled.div`
  line-height: 1.6;
  color: #2a3038;
`;

const DescriptionText = styled.div`
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const ReviewContent = styled.div``;

const ReviewList = styled.div``;

const ReviewItem = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeff1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ReviewerName = styled.div`
  font-weight: 600;
  color: #2a3038;
  margin-bottom: 8px;
`;

const ReviewText = styled.div`
  color: #2a3038;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const DetailsContent = styled.div`
  line-height: 1.6;
  color: #2a3038;
`;

const DetailsSection = styled.div`
  margin-bottom: 20px;
`;

const DetailsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2a3038;
  margin: 0 0 8px 0;
`;

const DetailsText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ProductDetailContent = ({
  activeTab,
  productDetail,
  productReview,
  isLoadingDetail,
  isLoadingReview,
}: ProductDetailContentProps) => {
  const renderDescription = () => {
    if (isLoadingDetail) {
      return <LoadingText>상품 설명을 불러오는 중...</LoadingText>;
    }

    if (!productDetail) {
      return <LoadingText>상품 설명을 불러올 수 없습니다.</LoadingText>;
    }

    return (
      <DescriptionContent>
        <DescriptionText
          dangerouslySetInnerHTML={{ __html: productDetail.data.description }}
        />
      </DescriptionContent>
    );
  };

  const renderReviews = () => {
    if (isLoadingReview) {
      return <LoadingText>리뷰를 불러오는 중...</LoadingText>;
    }

    if (!productReview) {
      return <LoadingText>리뷰를 불러올 수 없습니다.</LoadingText>;
    }

    return (
      <ReviewContent>
        <ReviewList>
          {productReview.data.reviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewerName>{review.authorName}</ReviewerName>
              <ReviewText>{review.content}</ReviewText>
            </ReviewItem>
          ))}
        </ReviewList>
      </ReviewContent>
    );
  };

  const renderDetails = () => {
    if (isLoadingDetail) {
      return <LoadingText>상세 정보를 불러오는 중...</LoadingText>;
    }

    if (!productDetail) {
      return <LoadingText>상세 정보를 불러올 수 없습니다.</LoadingText>;
    }

    return (
      <DetailsContent>
        {productDetail.data.announcements.map((announcement, index) => (
          <DetailsSection key={index}>
            <DetailsTitle>{announcement.name}</DetailsTitle>
            <DetailsText>{announcement.value}</DetailsText>
          </DetailsSection>
        ))}
      </DetailsContent>
    );
  };

  return (
    <ContentContainer>
      {activeTab === 'description' && renderDescription()}
      {activeTab === 'reviews' && renderReviews()}
      {activeTab === 'details' && renderDetails()}
    </ContentContainer>
  );
};

export default ProductDetailContent;
