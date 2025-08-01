import styled from '@emotion/styled';
import type { ProductHighlightReview } from '@/types/productDetail';

const ReviewSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TotalReviews = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ReviewItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
`;

const ReviewHeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ReviewerName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const NoReviews = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1.1rem;
`;

interface ProductReviewSectionProps {
  reviewData: ProductHighlightReview;
}

const ProductReviewSection = ({ reviewData }: ProductReviewSectionProps) => {
  return (
    <ReviewSection>
      <ReviewHeader>
        <SectionTitle>하이라이트 리뷰</SectionTitle>
        <ReviewSummary>
          <TotalReviews>총 {reviewData.totalCount}개의 리뷰</TotalReviews>
        </ReviewSummary>
      </ReviewHeader>

      {reviewData.reviews && reviewData.reviews.length > 0 ? (
        <ReviewList>
          {reviewData.reviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewHeaderItem>
                <ReviewerInfo>
                  <ReviewerName>{review.authorName}</ReviewerName>
                </ReviewerInfo>
              </ReviewHeaderItem>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviews>아직 리뷰가 없습니다.</NoReviews>
      )}
    </ReviewSection>
  );
};

export default ProductReviewSection; 