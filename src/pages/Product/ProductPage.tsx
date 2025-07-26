import Container from "@/components/common/Container";
import ProductInfo from "@/pages/Product/components/ProductInfo";
import ProductContent from "@/pages/Product/components/ProductContent";
import { useParams, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;

  if (!productId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Suspense fallback={<Loading height="90vh" />}>
        <ProductInfo productId={productId} />
        <ProductContent />
      </Suspense>
    </Container>
  );
};

export default ProductPage;
