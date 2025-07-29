import type { GiftReview } from "@/types/gift";
import styled from "@emotion/styled";

type ProductReviewSectionProps = {
  reviews: GiftReview[];
};

const ProductReviewSection = ({ reviews }: ProductReviewSectionProps) => {
  return (
    <Container>
      {reviews.map(review => (
        <Review key={review.id}>
          <Name>{review.authorName}</Name>
          <Content>{review.content}</Content>
        </Review>
      ))}
    </Container>
  );
};

export default ProductReviewSection;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Review = styled.div`
  margin: ${({ theme }) =>
    `${theme.spacing.spacing4} 0 ${theme.spacing.spacing2}`};
`;

const Name = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
