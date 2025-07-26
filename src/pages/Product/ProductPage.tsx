import Container from "@/components/common/Container";
import ProductInfo from "@/pages/Product/components/ProductInfo";
import ProductContent from "@/pages/Product/components/ProductContent";
import { useParams, Navigate } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;

  if (!productId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <ProductInfo productId={productId} />
      <ProductContent />
    </Container>
  );
};

export default ProductPage;
