import {
  ProductReviewWrapper,
  ReviewName,
  ReviewWrapper,
} from '@/components/ProductDetail/ProductMain/Review/ProductReview.style.ts';
import type { ReviewProps } from '@/types/products/detail/reviewTypes.ts';

export default function ProductReview({ review }: ReviewProps) {
  return (
    <ProductReviewWrapper>
      {review.reviews.map((item) => (
        <ReviewWrapper key={item.id}>
          <ReviewName>{item.authorName}</ReviewName>
          <div>{item.content}</div>
        </ReviewWrapper>
      ))}
    </ProductReviewWrapper>
  );
}
