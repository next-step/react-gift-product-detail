import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '@/components/common/Spinner';
import { ErrorBoundary } from '@/ErrorBoundary';

import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import ProductInfo from '@/components/detail/ProductInfo';
import ProductTabs from '@/components/detail/ProductTabs';
import FooterButton from '@/components/detail/FooterButton';
import { useProductWish } from '@/hooks/useProductWish';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

const CenteredSpinner = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const parsedId = Number(productId);

  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  const { isWished, wishCount, toggleWish, isLoading } = useProductWish(parsedId);

  if (!productId || isNaN(parsedId)) return <div>유효하지 않은 상품입니다.</div>;

  return (
    <MobileLayout>
      <ErrorBoundary fallback={<div>상품 정보를 불러오는 데 실패했습니다.</div>}>
        <Suspense
          fallback={
            <CenteredSpinner>
              <Spinner />
            </CenteredSpinner>
          }
        >
          <Wrapper>
            <NavBar />
            <ProductInfo />
            <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} productId={productId} />
            {!isLoading && (
              <FooterButton
                liked={isWished}
                likeCount={wishCount}
                toggleLike={toggleWish}
                productId={productId}
              />
            )}
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    </MobileLayout>
  );
}
