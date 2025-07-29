import styled from '@emotion/styled';
import { useProductReviews } from '@/hooks/useProduct';

interface ProductReviewsProps {
  productId: number;
}

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const ReviewItem = styled.li`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray.gray100};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
`;

const Author = styled.div`
  ${({ theme }) => theme.typography.label1Bold};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const Content = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  white-space: pre-line;
`;

const Empty = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.textSub};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing6};
`;

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { data } = useProductReviews(productId);

  if (!data || data.reviews.length === 0) {
    return <Empty>아직 작성된 선물 후기가 없어요.</Empty>;
  }

  return (
    <ReviewList>
      {data.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <Author>{review.authorName}</Author>
          <Content>{review.content}</Content>
        </ReviewItem>
      ))}
    </ReviewList>
  );
};

export default ProductReviews;
