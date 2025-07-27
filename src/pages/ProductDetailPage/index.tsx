import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useProductDetail,
  useProductDetailDetail,
  useProductDetailHeart,
  useProductDetailReview,
  useToggleHeart,
} from './useProductDetail';
import { type TabKey } from './constants/tabs';
import ProductHeader from './components/ProductHeader';
import ProductTabs from './components/ProductTabs';
import ProductActions from './components/ProductActions';
import DescriptionTab from './components/TabContent/DescriptionTab';
import ReviewTab from './components/TabContent/ReviewTab';
import DetailTab from './components/TabContent/DetailTab';
import * as S from './styles';
import SuspenseWrapper from '@/components/common/SuspenseWrapper';
import ApiErrorBoundary from '@/components/common/ErrorBoundary';

const ProductDetailPage: React.FC = () => {
  return (
    <ApiErrorBoundary>
      <SuspenseWrapper>
        <ProductDetailContent />
      </SuspenseWrapper>
    </ApiErrorBoundary>
  );
};

const ProductDetailContent: React.FC = () => {
  const navigate = useNavigate();
  const { product } = useProductDetail();
  const [selectedTab, setSelectedTab] = useState<TabKey>('description');
  const detail = useProductDetailDetail();
  const review = useProductDetailReview();
  const heart = useProductDetailHeart();
  const { toggleHeart } = useToggleHeart();

  if (!product) return <div>상품 정보가 없습니다.</div>;

  const handleHeartClick = () => {
    toggleHeart();
  };

  const handleOrderClick = () => {
    navigate(`/order/${product.id}`);
  };

  const handleTabChange = (tab: TabKey) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <ProductHeader product={product} />
      <S.BigLine />
      <S.Container>
        <ProductTabs selectedTab={selectedTab} onTabChange={handleTabChange} />
        <S.TabContent>
          {selectedTab === 'description' && detail && (
            <DescriptionTab detail={detail} />
          )}
          {selectedTab === 'review' && review && <ReviewTab review={review} />}
          {selectedTab === 'detail' && detail && <DetailTab detail={detail} />}
        </S.TabContent>
      </S.Container>
      <ProductActions
        heart={heart}
        onHeartClick={handleHeartClick}
        onOrderClick={handleOrderClick}
      />
    </>
  );
};

export default ProductDetailPage;
