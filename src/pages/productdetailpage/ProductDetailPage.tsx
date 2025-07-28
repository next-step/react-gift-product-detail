import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useProductData } from "@/pages/productdetailpage/hooks/useProductData";
import ProductInfoSection from "@/pages/productdetailpage/ProductInfoSection";
import ProductExplanationSection from "@/pages/productdetailpage/ProductExplanationSection";
import ReviewSection from "@/pages/productdetailpage/ReviewSection";
import ProductDetailSection from "@/pages/productdetailpage/ProductDetailSection";
import ProductActionsBar from "@/pages/productdetailpage/ProductActionsBar";
import ProductDetailTabs from "@/pages/productdetailpage/ProductDetailTabs";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "details"
  >("description");

  const { productInfo, productDetail, highlightReview, wishCount } =
    useProductData(productId || "");

  if (!productInfo || !productDetail) {
    return <Container>상품 정보를 불러오는 중...</Container>;
  }

  return (
    <Container>
      <ProductInfoSection productInfo={productInfo} />
      <ProductDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "description" && (
        <ProductExplanationSection productDetail={productDetail} />
      )}
      {activeTab === "reviews" && highlightReview && (
        <ReviewSection highlightReview={highlightReview} />
      )}
      {activeTab === "details" && (
        <ProductDetailSection productDetail={productDetail} />
      )}
      <ProductActionsBar productId={productId || ""} wishCount={wishCount} />
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 70px;
  text-align: center;
  max-width: 700px;
`;

export default ProductDetailPage;
