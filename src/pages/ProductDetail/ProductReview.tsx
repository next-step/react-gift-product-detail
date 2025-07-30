import type { ProductHighlightReview } from '@/types/DTO/productDTO';

import { ReviewContainer, ReviewItem, ReviewAuthor } from '@/styles/Product/ProductReview.styles';

interface ProductReviewProps {
  productReviewInfo: ProductHighlightReview | undefined;
}
function ProductReview({ productReviewInfo }: ProductReviewProps) {
  return (
    <ReviewContainer>
      {productReviewInfo?.reviews.map((review) => (
        <ReviewItem key={review.id}>
          <ReviewAuthor>{review.authorName}</ReviewAuthor>
          <p>{review.content}</p>
        </ReviewItem>
      ))}
    </ReviewContainer>
  );
}
export default ProductReview;
