import { highlightReviewQueryOptions } from '@/hooks/useProduct';
import { useSuspenseQuery } from '@tanstack/react-query';

import Gap from '@/components/common/Gap.style';
import {
  ReviewWrapper,
  ReviewItem,
  AuthorName,
  Content,
} from '@/components/product/ProductReview.style';

interface ProductReviewProps {
  productId: number;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  const { data } = useSuspenseQuery(highlightReviewQueryOptions(productId));
  return (
    <ReviewWrapper>
      {data.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <AuthorName>{review.authorName}</AuthorName>
          <Gap height={8} />
          <Content>{review.content}</Content>
          <Gap height={24} />
        </ReviewItem>
      ))}
    </ReviewWrapper>
  );
};

export default ProductReview;
