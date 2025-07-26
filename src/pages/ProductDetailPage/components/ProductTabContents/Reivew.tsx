import { QUERY_KEY } from "@/constants/queryKey";
import { getProductHighlightReview } from "@/data/api";
import styled from "@emotion/styled";
import { useSuspenseQuery } from "@tanstack/react-query";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ReviewerName = styled.h1`
  font-size: ${({ theme }) => theme.typography.body.body2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body2Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const ReviewerContent = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

function Review({ productId }: { productId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_HIGHLIGHT_REVIEW(productId),
    queryFn: () => getProductHighlightReview(productId),
  });

  return (
    <ReviewListContainer>
      {data.reviews.map((el) => (
        <ReviewContainer>
          <ReviewerName>{el.authorName}</ReviewerName>
          <ReviewerContent>{el.content}</ReviewerContent>
        </ReviewContainer>
      ))}
    </ReviewListContainer>
  );
}

export default Review;
