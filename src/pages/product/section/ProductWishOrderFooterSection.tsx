import { useNavigate, useParams } from "react-router-dom";
import { useProductWish } from "@/hooks/useProductWish";
import ProductWishOrderFooter from "../components/ProductWishOrderFooter";
import { ROUTES } from "@/constants/routes";

const ProductWishOrderFooterSection = () => {
  const { productId } = useParams();
  const numericId = Number(productId);
  const navigate = useNavigate();

  const { wish, toggleWish, isLoading } = useProductWish(numericId);

  if (!wish) return null;

  return (
    <ProductWishOrderFooter
      currentLiked={wish.isWished}
      currentLikeCount={wish.wishCount}
      isHeartLoading={isLoading}
      onHeartClick={toggleWish}
      onOrderClick={() => navigate(ROUTES.ORDER_DETAIL(numericId))}
    />
  );
};

export default ProductWishOrderFooterSection;
