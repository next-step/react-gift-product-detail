import { BlankSpace, LoadingSpinner } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { MainPageErrorFallback } from "@/components/error/MainPageErrorFallback";
import {
  ProductDetailDescription,
  ProductDetailInfo,
  ProductDetailOrderButton,
  ProductDetailPageLayout,
  ProductDetailReview,
  ProductDetailSummary,
  ProductDetailTab,
} from "@/components/productDetail";
import { useRouter } from "@/hooks/common/useRouter";
import { useFakeWish, useProductDetail } from "@/hooks/products";
import { queryClient } from "@/query-client";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailContent = ({ productId }: { productId: number }) => {
  const { goOrderPage } = useRouter();
  const { highlightReview, productDetail, productInfo, wishCount } =
    useProductDetail(productId);
  const wishMutation = useFakeWish();

  const [activeTab, setActiveTab] = useState("description");

  const handleWishClick = () => {
    wishMutation.mutate(productId);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const tabContent = {
    description: (
      <ProductDetailSummary description={productDetail?.description} />
    ),
    review: <ProductDetailReview reviews={highlightReview} />,
    details: <ProductDetailDescription detail={productDetail} />,
  };

  return (
    <>
      <ProductDetailInfo productInfo={productInfo} />
      <BlankSpace spacing="spacing2" />
      <ProductDetailTab activeTab={activeTab} onTabChange={handleTabChange} />
      {tabContent[activeTab as keyof typeof tabContent]}
      <ProductDetailOrderButton
        onClick={() => goOrderPage(Number(productId))}
        onWishClick={handleWishClick}
        wishCount={wishCount.wishCount}
        isWished={wishCount.isWished}
      />
    </>
  );
};

export const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const handleProductDetailRetry = () => {
    queryClient.refetchQueries({ queryKey: ["product", Number(productId)] });
  };
  return (
    <ProductDetailPageLayout>
      <ErrorBoundary
        fallback={reset => (
          <MainPageErrorFallback
            onRetry={() => {
              handleProductDetailRetry();
              reset();
            }}
            title="상품을 불러올 수 없습니다."
          />
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ProductDetailContent productId={Number(productId)} />
        </Suspense>
      </ErrorBoundary>
    </ProductDetailPageLayout>
  );
};
