import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { ErrorBoundary, LoadingSkeleton } from '@/components/common';
import { ROUTE_HOME } from '@/constants';
import {
  useProductBasic,
  useProductDetail,
  useProductWish,
  useProductHighlightReview,
} from '@/api/product/query';
import {
  ProductDetailHeader,
  ProductDetailTabs,
  ProductDetailContent,
  ProductDetailActions,
} from '@/components/product-detail';
import type { TabType } from '@/components/product-detail/ProductDetailTabs';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!productId) {
    navigate(ROUTE_HOME);
    return null;
  }

  // API 호출
  const {
    data: productBasic,
    isLoading: isLoadingBasic,
    error: errorBasic,
  } = useProductBasic(productId);
  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useProductDetail(productId);
  const {
    data: productWish,
    isLoading: isLoadingWish,
    error: errorWish,
  } = useProductWish(productId);
  const {
    data: productReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = useProductHighlightReview(productId);

  const isLoading =
    isLoadingBasic || isLoadingDetail || isLoadingWish || isLoadingReview;
  const hasError = errorBasic || errorDetail || errorWish || errorReview;

  if (isLoading) {
    return (
      <Container>
        <LoadingSkeleton type="card" />
      </Container>
    );
  }

  if (!productBasic) {
    throw new Error(`존재하지 않는 상품입니다. (상품 ID: ${productId})`);
  }

  if (hasError) {
    throw new Error(`API 오류가 발생했습니다. (상품 ID: ${productId})`);
  }

  return (
    <ErrorBoundary>
      <>
        <ProductDetailHeader
          product={productBasic}
          isLoading={isLoadingBasic}
        />

        <ProductDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ProductDetailContent
          activeTab={activeTab}
          productDetail={productDetail}
          productReview={productReview}
          isLoadingDetail={isLoadingDetail}
          isLoadingReview={isLoadingReview}
        />

        {/* 고정된 하단 버튼을 위한 여백 */}
        <div style={{ height: '80px' }} />

        <ProductDetailActions productId={productId} productWish={productWish} />
      </>
    </ErrorBoundary>
  );
};

export default ProductDetailPage;
