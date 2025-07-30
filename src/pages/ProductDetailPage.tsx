import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common';
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

  // API 호출 - Suspense 모드로 변경
  const { data: productBasic, error: errorBasic } = useProductBasic(productId);
  const { data: productDetail, error: errorDetail } =
    useProductDetail(productId);
  const { data: productWish, error: errorWish } = useProductWish(productId);
  const { data: productReview, error: errorReview } =
    useProductHighlightReview(productId);

  const hasError = errorBasic || errorDetail || errorWish || errorReview;

  if (hasError) {
    throw new Error(`API 오류가 발생했습니다. (상품 ID: ${productId})`);
  }

  // Suspense 모드에서는 데이터가 준비되면 자동으로 렌더링됨
  // productBasic이 null이면 API에서 해당 상품을 찾지 못한 것
  if (productBasic === null) {
    throw new Error(`존재하지 않는 상품입니다. (상품 ID: ${productId})`);
  }

  return (
    <ErrorBoundary>
      <>
        <ProductDetailHeader product={productBasic} />

        <ProductDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ProductDetailContent
          activeTab={activeTab}
          productDetail={productDetail}
          productReview={productReview}
        />

        {/* 고정된 하단 버튼을 위한 여백 */}
        <div style={{ height: '80px' }} />

        <ProductDetailActions productId={productId} productWish={productWish} />
      </>
    </ErrorBoundary>
  );
};

export default ProductDetailPage;
