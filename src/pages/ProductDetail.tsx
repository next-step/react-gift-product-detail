import { useParams, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { 
  useSuspenseProductInfo, 
  useSuspenseProductDetail, 
  useSuspenseProductHighlightReview, 
  useSuspenseProductWish, 
  useToggleWish 
} from '@/api/productDetail';
import ErrorBoundary from '@/Components/ErrorBoundary';
import LoadingSpinner from '@/Components/LoadingSpinner';
import ProductHeader from '@/Components/ProductHeader';
import ProductWishSection from '@/Components/ProductWishSection';
import ProductDetailSection from '@/Components/ProductDetailSection';
import ProductReviewSection from '@/Components/ProductReviewSection';
import ProductOrderSection from '@/Components/ProductOrderSection';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProductDetailContent = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const id = productId ? parseInt(productId) : 0;

  if (id === 0) {
    throw new Error('유효하지 않은 상품 ID입니다.');
  }

  const { data: product } = useSuspenseProductInfo(id);
  const { data: productDetail } = useSuspenseProductDetail(id);
  const { data: reviewData } = useSuspenseProductHighlightReview(id);
  const { data: wishData } = useSuspenseProductWish(id);
  const toggleWishMutation = useToggleWish(id);

  const handleToggleWish = async () => {
    try {
      await toggleWishMutation.mutateAsync();
    } catch (error) {
      console.error('찜 토글 실패:', error);
    }
  };

  const handleOrderClick = () => {
    navigate(`/order/${productId}`);
  };

  return (
    <Layout>
      <ProductContainer>
        <ProductHeader product={product} />
        <ProductWishSection
          wishData={wishData}
          onToggleWish={handleToggleWish}
          isPending={toggleWishMutation.isPending}
        />
        <ProductDetailSection productDetail={productDetail} />
        <ProductReviewSection reviewData={reviewData} />
        <ProductOrderSection onOrderClick={handleOrderClick} />
      </ProductContainer>
    </Layout>
  );
};

const ProductDetail = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="상품 정보를 불러오는 중..." />}>
        <ProductDetailContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductDetail; 