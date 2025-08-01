import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import SuspenseWrapper from "@/components/SuspenseWrapper/SuspenseWrapper";
import { useAuth } from "@/hooks/useAuth";
import { useGetProductInfo } from "@/hooks/useGetProductInfo";
import { useGetProductDetailInfo } from "@/hooks/useGetProductDetailInfo";
import { useGetProductReviewInfo } from "@/hooks/useGetProductReviewInfo";
import { useGetProductWishInfo } from "@/hooks/useGetProductWishInfo";
import ProductInfoSection from "@/pages/DetailPage/components/ProductInfoSection/ProductInfoSection";
import LikeSection from "@/pages/DetailPage/components/LikeSection/LikeSection";
import ProductTabSection from "@/pages/DetailPage/components/ProductTabSection/ProductTabSection";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import {
  Wrapper,
  Container,
  SectionDivider,
  OrderButton,
  BottomBar,
} from "@/pages/DetailPage/DetailPage.style";
import { PRODUCT_TABS, type ProductTab } from "@/constants/tabs";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();
  const auth = useAuth();

  const [activeTab, setActiveTab] = useState<ProductTab>(
    PRODUCT_TABS.DESCRIPTION
  );

  const { data: item, isLoading, isError } = useGetProductInfo(productId);
  const { data: detailInfo } = useGetProductDetailInfo(productId);
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = useGetProductReviewInfo(productId);

  const { data: wishInfo } = useGetProductWishInfo(productId);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (wishInfo) {
      setLiked(wishInfo.isWished);
      setLikeCount(wishInfo.wishCount);
    }
  }, [wishInfo]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !item) return <div>상품 정보를 불러오지 못했습니다.</div>;

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleOrderClick = () => {
    if (!auth?.user) {
      navigate("/login", { state: { from: `/order/${productId}` } });
    } else {
      navigate(`/order/${productId}`);
    }
  };

  return (
    <ErrorBoundary>
      <NavigationBar />
      <Wrapper>
        <Container>
          <ProductInfoSection item={item} detailInfo={detailInfo} />
        </Container>
        <SectionDivider />
        <Container>
          <SuspenseWrapper>
            <ProductTabSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              detailInfo={detailInfo}
              reviewData={reviewData}
              isReviewLoading={isReviewLoading}
              isReviewError={isReviewError}
            />
          </SuspenseWrapper>
        </Container>
      </Wrapper>
      <BottomBar>
        <LikeSection
          isLiked={liked}
          likeCount={likeCount}
          onToggle={handleLikeToggle}
        />
        <OrderButton onClick={handleOrderClick}>주문하기</OrderButton>
      </BottomBar>
    </ErrorBoundary>
  );
};

export default DetailPage;
