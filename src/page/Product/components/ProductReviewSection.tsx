import { requests } from '@/api/requests';
import { useQuery } from '@tanstack/react-query';

interface ProductReviewSectionProps {
  index: number;
}
const ProductReviewSection = ({ index }: ProductReviewSectionProps) => {
  const productReviewQuery = useQuery({
    queryKey: ['productReviewData'],
    queryFn: () => requests.fetchProductReview(index),
  });

  return (
    <div>
      <div>
        <div>
          {productReviewQuery.data?.reviews.map(review => (
            <div key={review.id}>
              <p>{review.authorName}</p>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
