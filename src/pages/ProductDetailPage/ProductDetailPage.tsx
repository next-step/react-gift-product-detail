import { Loading } from "@/components/Loading/Loading";
import { QUERY_KEY } from "@/constants/queryKey";
import { getProductDetail, getProductWish } from "@/data/api";
import Layout from "@/layout";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { useNavigate, useParams } from "react-router-dom";
import {
  ErrorContainer,
  ErrorMessage,
} from "../HomePage/components/Category/Category.styles";
import LikeIconImage from "./assets/heart.png";
import LikeIconImageFill from "./assets/heart-fill.png";
import {
  ContentLayout,
  LikeCount,
  LikeIcon,
  LikeIconContainer,
  OrderButton,
  OrderButtonContainer,
} from "./ProductDetailPage.styles";
import { ROUTES } from "@/constants/routes";
import ProductHeader from "./components/ProductHeader/ProductHeader";
import { PRODUCT_DETAIL_LABELS } from "./constants/labels";
import ProductTabContents from "./components/ProductTabContents/ProductTabContents";

function ProductDetailContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}

function BottomNavigationWrapper({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  // 낙관적 업데이트 - data 에 유저의 좋아요 유무 정보(isLiked)가 포함되어 있다고 가정
  const { data } = useQuery({
    queryKey: QUERY_KEY.PRODUCT_WISH(productId),
    queryFn: () => getProductWish(productId),
  });

  useEffect(() => {
    if (data) {
      // setIsLiked(data.isLiked); 실제론 api 에 포함되어 있지 않음
      setWishCount(data.wishCount);
    }
  }, [data]);

  // 낙관적 업데이트 처리
  const handleLikeToggle = async () => {
    const prevLike = isLiked;
    const prevWishCount = wishCount;

    setIsLiked(!prevLike);
    setWishCount(prevWishCount + (prevLike ? -1 : 1));

    try {
      // if (!prevLike) {
      //   await likeProduct(productId);
      // } else {
      //   await unlikeProduct(productId);
      // }
    } catch (error) {
      setIsLiked(prevLike);
      setWishCount(prevWishCount);
      console.error(error);
    }
  };

  const handleOrderButtonClick = () => {
    navigate(ROUTES.ORDER.replace(":id", productId));
  };

  return (
    <>
      <ProductDetailContentLayout>{children}</ProductDetailContentLayout>
      <OrderButtonContainer>
        <LikeIconContainer onClick={handleLikeToggle}>
          <LikeIcon src={isLiked ? LikeIconImageFill : LikeIconImage} alt="" />
          <LikeCount>{wishCount}</LikeCount>
        </LikeIconContainer>
        <OrderButton onClick={handleOrderButtonClick}>
          {PRODUCT_DETAIL_LABELS.ORDER_BUTTON}
        </OrderButton>
      </OrderButtonContainer>
    </>
  );
}

function ProductDetailQueryContent() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.PRODUCT_DETAIL(id),
    queryFn: () => getProductDetail(id!),
  });

  return (
    <BottomNavigationWrapper productId={id!}>
      <ProductHeader data={data} />
      <ProductTabContents productId={id!} />
    </BottomNavigationWrapper>
  );
}

function ProductDetailPage() {
  return (
    <Layout>
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
          <ProductDetailQueryContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default ProductDetailPage;
