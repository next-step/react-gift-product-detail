import styled from '@emotion/styled';
import Text from '@/common/Text';
import type { ProductHighlightReview } from '@/types/product';

interface ProductReviewsTabProps {
  highlightReview: ProductHighlightReview | undefined;
}

const ProductReviewsTab = ({ highlightReview }: ProductReviewsTabProps) => {
  return (
    <Layout>
      {highlightReview && highlightReview.reviews.length > 0 ? (
        highlightReview.reviews.map((review) => (
          <ReviewItem key={review.id}>
            <Text size="label1" weight="bold">
              {review.authorName}
            </Text>
            <Text>{review.content}</Text>
          </ReviewItem>
        ))
      ) : (
        <Text>선물 후기가 없습니다.</Text>
      )}
    </Layout>
  );
};

export default ProductReviewsTab;

const Layout = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  padding-bottom: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  line-height: 1.6;
`;
