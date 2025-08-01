import styled from '@emotion/styled';
import ProductReviewSection from './components/ProductReviewSection';
import ProductDescriptionSection from './components/ProductDescriptionSection';
import ProductDetailSection from './components/ProductDetailSection';
import ProductWishButton from './components/productWishButton';
import ProductSection from './components/ProductSection';
import { useParamsIndex } from '@/hooks/useParamsIndex';
import { Suspense, useState } from 'react';
import OrderButton from './components/OrderButton';
import Loading from '@/components/common/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const ProductPage = () => {
  const index = useParamsIndex();
  const [activeTab, setActiveTab] = useState('description');
  if (!index) return;

  return (
    <main>
      <ErrorBoundary fallback={<div>상품 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<Loading />}>
          <ProductSection index={index} />
        </Suspense>
      </ErrorBoundary>
      <section>
        <div>
          <ButtonWrapper>
            <button onClick={() => setActiveTab('description')}>
              <p>상품설명</p>
            </button>
            <button onClick={() => setActiveTab('review')}>
              <p>선물후기</p>
            </button>
            <button onClick={() => setActiveTab('detail')}>
              <p>상세정보</p>
            </button>
          </ButtonWrapper>

          <ErrorBoundary fallback={<div>상세 내용을 불러올 수 없습니다.</div>}>
            <Suspense fallback={<Loading />}>
              {activeTab === 'description' && <ProductDescriptionSection index={index} />}
              {activeTab === 'review' && <ProductReviewSection index={index} />}{' '}
              {activeTab === 'detail' && <ProductDetailSection index={index} />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>관심 등록에 실패했습니다.</div>}>
            <Suspense fallback={<Loading />}>
              <ProductWishButton index={index} />
            </Suspense>
          </ErrorBoundary>

          <OrderButton index={index} />
        </div>
      </section>
    </main>
  );
};

export default ProductPage;

const ButtonWrapper = styled.div`
  justify-content: flex-start;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid rgb(238, 239, 241);
`;
