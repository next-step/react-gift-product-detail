import { useParams } from "react-router-dom";
import { useProductInfo } from "@/hooks/useProductInfo";
import ProductSummary from "@/pages/product/components/ProductInfo";

const ProductSummarySection = () => {
  const { productId } = useParams();
  const { product } = useProductInfo(Number(productId));

  return <ProductSummary product={product} />;
};

export default ProductSummarySection;
