import Container from "@/components/common/Container";
import ProductInfo from "@/pages/Product/components/ProductInfo";
import ProductContent from "@/pages/Product/components/ProductContent";
import { useNavigate, useParams } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import Divider from "@/components/common/Divider";
import ProductOrder from "./components/ProductOrder";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { ROUTE_PATH } from "@/components/routes/routePath";
import { showFetchErrorToast } from "@/utils/showFetchToast";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;

  const navigate = useNavigate();
  const goHome = () => navigate(ROUTE_PATH.HOME);
  if (!productId) {
    goHome();
    return null;
  }

  return (
    <Container>
      <ErrorBoundary fallback={null} onError={(error) => showFetchErrorToast(error, goHome)}>
        <Suspense fallback={<Loading height="90vh" />}>
          <ProductInfo productId={productId} />
          <Divider spacing="0.5rem" fill={false} />
          <ProductContent productId={productId} />
          <Divider spacing="4rem" />
          <ProductOrder productId={productId} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default ProductPage;
