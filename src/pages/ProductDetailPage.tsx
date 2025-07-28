import { BlankSpace } from "@/components/common";
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
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { goOrderPage } = useRouter();
  const { highlightReview, productDetail, productInfo, wishCount } =
    useProductDetail(Number(productId));
  const wishMutation = useFakeWish();

  const [activeTab, setActiveTab] = useState("description");

  const handleWishClick = () => {
    wishMutation.mutate(Number(productId));
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
    <ProductDetailPageLayout>
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
    </ProductDetailPageLayout>
  );
};
