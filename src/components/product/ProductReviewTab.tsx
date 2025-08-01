import type { ProductReview } from '@/types/product';
import styled from '@emotion/styled';

export const ProductReviewTab = ({ productReview }: { productReview: ProductReview }) => {
  return (
    <Container>
      <h2>선물후기 ({productReview.totalCount})</h2>
      <ReviewList>
        {productReview.reviews.map((review) => (
          <ReviewItem key={review.id}>
            <Author>{review.authorName}</Author>
            <Content>{review.content}</Content>
          </ReviewItem>
        ))}
      </ReviewList>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const ReviewList = styled.ul`
  margin-top: 16px;
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 16px 0;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Content = styled.p`
  color: #555;
`;