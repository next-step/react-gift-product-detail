import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
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

  // 찜 버튼 클릭 핸들러 (임시 - 실제로는 mutation 필요)
  const handleWishClick = () => {
    console.log('찜 버튼 클릭');
    // TODO: 찜 mutation 구현
  };

  if (isLoading) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>상품 정보를 불러오는 중...</h1>
        </div>
      </Container>
    );
  }

  if (hasError || !productBasic) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>상품 정보를 불러오지 못했습니다.</h1>
          <p>상품 ID: {productId}</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <ProductDetailHeader product={productBasic} isLoading={isLoadingBasic} />

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

      <ProductDetailActions
        productId={productId}
        productWish={productWish}
        onWishClick={handleWishClick}
        isWishLoading={isLoadingWish}
      />
    </>
  );
};

export default ProductDetailPage;
