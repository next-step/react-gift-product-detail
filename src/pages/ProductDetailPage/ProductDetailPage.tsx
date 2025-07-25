import { ErrorMessage } from "@/components/common/Input/FormErrorMessage";
import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail, getProductWish } from "@/data/api";
import Layout from "@/layout";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContainer } from "../HomePage/components/Category/Category.styles";
import LikeIconImage from "./assets/heart.png";
import {
  BottomMargin,
  LikeCount,
  LikeIcon,
  LikeIconContainer,
  OrderButton,
  OrderButtonContainer,
} from "./ProductDetailPage.styles";
import { ROUTES } from "@/constants/routes";
import ProductHeader from "./components/ProductHeader/ProductHeader";
import { PRODUCT_DETAIL_LABELS } from "./constants/labels";

function BottomNavigationWrapper({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: QUERY_KEY.PRODUCT_WISH(productId),
    queryFn: () => getProductWish(productId),
  });

  const handleOrderButtonClick = () => {
    navigate(ROUTES.ORDER.replace(":id", productId));
  };

  return (
    <>
      <BottomMargin>{children}</BottomMargin>
      <OrderButtonContainer>
        <LikeIconContainer>
          <LikeIcon src={LikeIconImage} alt="" />
          <LikeCount>{data?.wishCount}</LikeCount>
        </LikeIconContainer>
        <OrderButton onClick={handleOrderButtonClick}>
          {PRODUCT_DETAIL_LABELS.ORDER_BUTTON}
        </OrderButton>
      </OrderButtonContainer>
    </>
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
      <BottomNavigationWrapper productId={id!}>
        <ErrorBoundary
          fallback={
            <ErrorContainer>
              <ErrorMessage>
                {PRODUCT_DETAIL_LABELS.NO_PRODUCT_MESSAGE}
              </ErrorMessage>
            </ErrorContainer>
          }
        >
          <Suspense fallback={<Loading />}>
            <ProductHeader data={data} />
          </Suspense>
        </ErrorBoundary>
      </BottomNavigationWrapper>
    </Layout>
  );
}

export default ProductDetailPage;
