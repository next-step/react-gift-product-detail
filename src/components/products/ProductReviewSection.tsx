import type { GiftReview } from "@/types/gift";
import styled from "@emotion/styled";
import ContentItem from "./ContentItem";

type ProductReviewSectionProps = {
  reviews: GiftReview[];
};

const ProductReviewSection = ({ reviews }: ProductReviewSectionProps) => {
  return (
    <Container>
      {reviews.map(review => (
        <ContentItem
          key={review.id}
          title={review.authorName}
          content={review.content}
        />
      ))}
    </Container>
  );
};

export default ProductReviewSection;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;
