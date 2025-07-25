import { useParams } from "react-router-dom";
import { useProductReview } from "@/hooks/useProductReview";
import ProductReview from "@/pages/product/components/ProductReview";

const ProductReviewSection = () => {
  const { productId } = useParams();
  const { totalCount, reviews } = useProductReview(Number(productId));

  return <ProductReview totalCount={totalCount} reviews={reviews} />;
};

export default ProductReviewSection;
