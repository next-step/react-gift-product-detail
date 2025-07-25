import { useParams } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductDetail from "@/pages/product/components/ProductDetail";

const ProductDetailSection = () => {
  const { productId } = useParams();
  const { detail } = useProductDetail(Number(productId));

  return <ProductDetail description={detail.description} />;
};

export default ProductDetailSection;
