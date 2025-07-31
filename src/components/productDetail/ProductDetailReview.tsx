import type { ProductHighlightReviewResponseBody } from "@/api/product/types";
import styled from "@emotion/styled";

const ProductDetailReviewContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing4,
  backgroundColor: theme.color.gray[0],
}));

const ProductDetailReviewWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.spacing4} 0`,
}));

const ProductDetailAuthorName = styled.p(({ theme }) => ({
  fontSize: theme.typography.body2Bold.fontSize,
  fontWeight: theme.typography.body2Bold.fontWeight,
  lineHeight: theme.typography.body2Bold.lineHeight,
  color: theme.color.gray[900],
}));

const ProductDetailReviewContent = styled.p(({ theme }) => ({
  fontSize: theme.typography.body2Regular.fontSize,
  fontWeight: theme.typography.body2Regular.fontWeight,
  lineHeight: theme.typography.body2Regular.lineHeight,
  color: theme.color.gray[900],
}));

interface ProductDetailReviewProps {
  reviews: ProductHighlightReviewResponseBody;
}

export const ProductDetailReview = ({ reviews }: ProductDetailReviewProps) => {
  const productReview = reviews.reviews;
  return (
    <ProductDetailReviewContainer>
      {productReview.map(review => (
        <ProductDetailReviewWrapper key={`${review.id}+${review.authorName}`}>
          <ProductDetailAuthorName>{review.authorName}</ProductDetailAuthorName>
          <ProductDetailReviewContent>
            {review.content}
          </ProductDetailReviewContent>
        </ProductDetailReviewWrapper>
      ))}
    </ProductDetailReviewContainer>
  );
};
