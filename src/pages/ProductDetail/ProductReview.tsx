import type { ProductHighlightReview } from '@/types/DTO/productDTO';

import styled from '@emotion/styled';

export const ReviewContainer = styled.div`
  padding: 20px;
  background-color: white;
  line-height: 1.6;
`;
export const ReviewItem = styled.div`
  margin-bottom: 20px;
`;
export const ReviewAuthor = styled.p`
  margin: 0;
  ${({ theme }) => `
    font-size: ${theme.typography.body2Regular.fontSize};
    font-weight: bold;
  `}
`;

interface ProductReviewProps {
  productReviewInfo: ProductHighlightReview | undefined;
}
function ProductReview({ productReviewInfo }: ProductReviewProps) {
  return (
    <ReviewContainer>
      {productReviewInfo?.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <ReviewAuthor>{review.authorName}</ReviewAuthor>
          <p>{review.content}</p>
        </ReviewItem>
      ))}
    </ReviewContainer>
  );
}
export default ProductReview;
