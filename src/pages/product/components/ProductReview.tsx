import styled from "@emotion/styled";
import type { ProductReview as Review } from "@/types/product";

type Props = {
  totalCount: number;
  reviews: Review[];
};

const ProductReview = ({ reviews }: Props) => {
  return (
    <Wrapper>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <Author>{review.authorName}</Author>
            <Content>{review.content}</Content>
          </ReviewItem>
        ))}
      </ReviewList>
    </Wrapper>
  );
};

export default ProductReview;

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const ReviewTitle = styled.h3`
  ${({ theme }) => theme.typography.title2Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const ReviewItem = styled.li`
  background-color: ${({ theme }) => theme.colors.colorScale.gray.gray100};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: 8px;
`;

const Author = styled.p`
  ${({ theme }) => theme.typography.subtitle2Bold};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const Content = styled.p`
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  white-space: pre-line;
`;
