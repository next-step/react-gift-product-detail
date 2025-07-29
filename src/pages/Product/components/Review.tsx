import styled from "@emotion/styled";
import type { ProductReview } from "@/types/ProductType";

interface ReviewProps {
  data: ProductReview[];
}

const Review = ({ data }: ReviewProps) => {
  return (
    <Container>
      {data.map((review) => (
        <Wrapper key={review.id}>
          <Author>{review.authorName}</Author>
          <Content>{review.content}</Content>
        </Wrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
  & > div:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing2} 0;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;
const Author = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  text-align: left;
  color: ${({ theme }) => theme.color.kakaoBrown};
`;
const Content = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;
export default Review;
