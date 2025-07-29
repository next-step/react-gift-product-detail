import { useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';

import {
  fetchProductBasic,
  fetchProductDetail,
  fetchProductWish,
  fetchProductHighlightReview,
} from '@/api/product';
import type {
  ProductBasic,
  ProductDetail,
  ProductWish,
  ProductReview,
} from '@/types/product';

// 스타일 임포트
import { Container } from './ProductDetail/ProductDetail.styles';

// 분리된 컴포넌트 임포트
import ProductImageSection from './ProductDetail/ProductImageSection';
import ProductBasicInfoSection from './ProductDetail/ProductBasicInfoSection';
import TabNavigationSection from './ProductDetail/TabNavigationSection';
import TabContentSection from './ProductDetail/TabContentSection';
import ActionButtonsSection from './ProductDetail/ActionButtonsSection';

type TabType = 'description' | 'reviews' | 'detail';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const {
    data: productBasic,
    isLoading: isLoadingBasic,
    error: errorBasic,
  } = useQuery({
    queryKey: ['product', 'basic', productId],
    queryFn: () => fetchProductBasic(Number(productId)),
    enabled: !!productId,
  });

  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail(Number(productId)),
    enabled: !!productId,
  });

  const {
    data: productWish,
    isLoading: isLoadingWish,
    error: errorWish,
  } = useQuery({
    queryKey: ['product', 'wish', productId],
    queryFn: () => fetchProductWish(Number(productId)),
    enabled: !!productId,
  });

  const {
    data: productReviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useQuery({
    queryKey: ['product', 'highlight-review', productId],
    queryFn: () => fetchProductHighlightReview(Number(productId)),
    enabled: !!productId && activeTab === 'reviews',
  });

  const wishMutation = useMutation({
    mutationFn: () => fetchProductWish(Number(productId)),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['product', 'wish', productId],
      });
      const previousWish = queryClient.getQueryData([
        'product',
        'wish',
        productId,
      ]);

      queryClient.setQueryData(
        ['product', 'wish', productId],
        (old: ProductWish | undefined) => {
          if (!old) return old;
          return {
            ...old,
            isWished: !old.isWished,
            wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
          };
        },
      );

      return { previousWish };
    },
    onError: (err, variables, context) => {
      if (context?.previousWish) {
        queryClient.setQueryData(
          ['product', 'wish', productId],
          context.previousWish,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['product', 'wish', productId],
      });
    },
  });

  const handleWishToggle = () => {
    wishMutation.mutate();
  };

  const handleOrderClick = () => {
    if (productId) {
      navigate(`/order/${productId}`);
    }
  };

  if (isLoadingBasic) {
    return (
      <ErrorBoundary>
        <Header />
        <Container>
          <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>
        </Container>
      </ErrorBoundary>
    );
  }

  if (errorBasic) {
    return (
      <ErrorBoundary>
        <Header />
        <Container>
          <div
            style={{ textAlign: 'center', padding: '40px', color: '#ff3b30' }}
          >
            에러가 발생했습니다: {errorBasic.message}
          </div>
        </Container>
      </ErrorBoundary>
    );
  }

  if (!productBasic) {
    return (
      <ErrorBoundary>
        <Header />
        <Container>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            상품 정보를 찾을 수 없습니다.
          </div>
        </Container>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>페이지를 불러오는 중...</div>}>
        <Header />
        <Container>
          <ProductImageSection
            imageURL={productBasic.imageURL}
            altText={productBasic.name}
          />

          <ProductBasicInfoSection
            name={productBasic.name}
            sellingPrice={productBasic.price.sellingPrice}
            brandImageURL={productBasic.brandInfo.imageURL}
            brandName={productBasic.brandInfo.name}
          />

          <TabNavigationSection
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <TabContentSection
            activeTab={activeTab}
            productDetail={productDetail}
            productReviews={productReviews}
            isLoadingReviews={isLoadingReviews}
            errorReviews={errorReviews}
            isLoadingDetail={isLoadingDetail}
            errorDetail={errorDetail}
          />

          <ActionButtonsSection
            productWish={productWish}
            onWishToggle={handleWishToggle}
            onOrderClick={handleOrderClick}
            isWishPending={wishMutation.isPending}
          />
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
}

export default ProductDetailPage;
