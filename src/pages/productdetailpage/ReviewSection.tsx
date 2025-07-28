/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { ProductHighlightReview } from "@/types/api_types";

interface ReviewSectionProps {
  highlightReview: ProductHighlightReview;
}

const ReviewSection = ({ highlightReview }: ReviewSectionProps) => {
  if (
    !highlightReview ||
    !highlightReview.reviews ||
    highlightReview.reviews.length === 0
  )
    return null;

  return (
    <Container>
      {highlightReview.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <ReviewAuthor>{review.authorName}</ReviewAuthor>
          <ReviewContent>{review.content}</ReviewContent>
        </ReviewItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  padding: 10px;
  text-align: left;
`;

const ReviewItem = styled.div`
  padding: 10px;
  margin-bottom: 30px;
`;

const ReviewAuthor = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewContent = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
`;

export default ReviewSection;
