import styled from '@emotion/styled';
import type { ProductHighlightReview } from 'src/types/product';

interface ReviewProps {
  reviewData: ProductHighlightReview;
}

const Reviews = ({ reviewData }: ReviewProps) => {
  const reviews = reviewData.reviews;

  return (
    <Container>
      {reviews.map((review) => (
        <ReviewItem key={review.id}>
          <Author>{review.authorName}</Author>
          <Content>{review.content}</Content>
        </ReviewItem>
      ))}
    </Container>
  );
};

export default Reviews;

const Container = styled.div(({ theme }) => ({
  padding: theme.spacing.spacing5,
}));

const ReviewItem = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.spacing7,
}));

const Author = styled.p(({ theme }) => ({
  ...theme.typography.body1Bold,
  marginBottom: theme.spacing.spacing3,
}));

const Content = styled.p(({ theme }) => ({
  ...theme.typography.body1Regular,
}));
