import useProductReviewQuery from '../hooks/useProductReviewQuery';

interface ProductReviewSectionProps {
  index: number;
}
const ProductReviewSection = ({ index }: ProductReviewSectionProps) => {
  const datas = useProductReviewQuery(index);

  return (
    <div>
      <div>
        <div>
          {datas.reviews.map(review => (
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
