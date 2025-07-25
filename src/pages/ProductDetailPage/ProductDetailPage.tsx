import { ErrorMessage } from "@/components/common/Input/FormErrorMessage";
import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail } from "@/data/api";
import Layout from "@/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContainer } from "../HomePage/components/Category/Category.styles";
import LikeIconImage from "./assets/heart.png";
import {
  LikeCount,
  LikeIcon,
  LikeIconContainer,
  OrderButton,
  OrderButtonContainer,
} from "./ProductDetailPage.styles";
import { ROUTES } from "@/constants/routes";

function BottomNavigation({ productId }: { productId: string }) {
  const navigate = useNavigate();

  const handleOrderButtonClick = () => {
    navigate(ROUTES.ORDER.replace(":id", productId));
  };

  return (
    <OrderButtonContainer>
      <LikeIconContainer>
        <LikeIcon src={LikeIconImage} alt="Like Icon" />
        <LikeCount>1237</LikeCount>
      </LikeIconContainer>
      <OrderButton onClick={handleOrderButtonClick}>주문하기</OrderButton>
    </OrderButtonContainer>
  );
}

function ProductDetailPage() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(id),
    queryFn: () => getProductDetail(id!),
  });

  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <ErrorContainer>
            <ErrorMessage>등록된 상품이 없습니다.</ErrorMessage>
          </ErrorContainer>
        }
      >
        <Suspense fallback={<Loading />}>
          <div>ProductDetailPage: {id}</div>
        </Suspense>
      </ErrorBoundary>
      <BottomNavigation productId={id!} />
    </Layout>
  );
}

export default ProductDetailPage;
