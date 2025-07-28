import styled from '@emotion/styled';
import type { Review } from '@/types/product';

interface Props {
  reviews: Review[];
}

const ProductReviews = ({ reviews }: Props) => {
  if (reviews.length === 0) {
    return <EmptyText>아직 등록된 선물 후기가 없습니다.</EmptyText>;
  }

  return (
    <ReviewList>
      {reviews.map(({ id, authorName, content }) => (
        <li key={id}>
          <Reviewer>{authorName}</Reviewer>
          <ReviewContent>{content}</ReviewContent>
        </li>
      ))}
    </ReviewList>
  );
};

export default ProductReviews;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 0;

  li {
    list-style: none;
  }
`;

const Reviewer = styled.p`
  ${({ theme }) => theme.typography.label.label1Bold};
  color: ${({ theme }) => theme.color.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ReviewContent = styled.p`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
  white-space: pre-wrap;
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
