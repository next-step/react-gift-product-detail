import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useProductInfo, useProductDetail, useProductHighlightReview, useProductWish, useToggleWish } from '@/api/productDetail';
import ErrorBoundary from '@/Components/ErrorBoundary';
import ProductHeader from '@/Components/ProductHeader';
import ProductWishSection from '@/Components/ProductWishSection';
import ProductDetailSection from '@/Components/ProductDetailSection';
import ProductReviewSection from '@/Components/ProductReviewSection';
import ProductOrderSection from '@/Components/ProductOrderSection';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.layout.containerPadding};
`;





const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1.2rem;
`;















const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TotalReviews = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ReviewItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
`;

const ReviewHeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ReviewerName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;



const ReviewContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;



const NoReviews = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1.1rem;
`;

const WishButton = styled.button<{ isWished: boolean }>`
  background: ${({ isWished, theme }) => isWished ? theme.colors.red.red500 : 'white'};
  color: ${({ isWished, theme }) => isWished ? 'white' : theme.colors.gray.gray600};
  border: 1px solid ${({ isWished, theme }) => isWished ? theme.colors.red.red500 : theme.colors.gray.gray300};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2rem;

  &:hover {
    background: ${({ isWished, theme }) => isWished ? theme.colors.red.red600 : theme.colors.gray.gray100};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;



const WishButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderButton = styled.button`
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  border: none;
  padding: ${({ theme }) => theme.spacing.button.paddingLarge};
  border-radius: ${({ theme }) => theme.spacing.button.borderRadiusLarge};
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  max-width: 300px;
  margin-top: ${({ theme }) => theme.spacing.xxl};

  &:hover {
    background: ${({ theme }) => theme.colors.semantic.kakaoYellowHover};
  }
`;

// 실제 상품 상세 내용을 렌더링하는 컴포넌트
const ProductDetailContent = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const id = productId ? parseInt(productId) : 0;

  const { 
    data: product, 
    isLoading: productLoading, 
    error: productError 
  } = useProductInfo(id);

  const {
    data: productDetail,
    isLoading: detailLoading,
    error: detailError
  } = useProductDetail(id);

  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError
  } = useProductHighlightReview(id);

  const {
    data: wishData,
    isLoading: wishLoading,
    error: wishError
  } = useProductWish(id);

  const toggleWishMutation = useToggleWish(id);

  const isLoading = productLoading || detailLoading || reviewLoading || wishLoading;
  const hasError = productError || detailError || reviewError || wishError;

  if (isLoading) {
    return (
      <Layout>
        <LoadingMessage>상품 정보를 불러오는 중...</LoadingMessage>
      </Layout>
    );
  }

  if (hasError) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  if (!product) {
    throw new Error('상품을 찾을 수 없습니다.');
  }

  const handleToggleWish = async () => {
    try {
      await toggleWishMutation.mutateAsync();
    } catch (error) {
      console.error('관심 등록 실패:', error);
    }
  };

  const handleOrderClick = () => {
    navigate(`/order/${productId}`);
  };



  const discountRate = product.price?.discountRate || 0;
  const hasDiscount = typeof discountRate === 'number' && discountRate > 0;

  return (
    <Layout>
      <ProductContainer>
        <ProductHeader product={product} />

        {wishData && (
          <ProductWishSection
            wishData={wishData}
            onToggleWish={handleToggleWish}
            isPending={toggleWishMutation.isPending}
          />
        )}

        {productDetail && (
          <ProductDetailSection productDetail={productDetail} />
        )}

        {reviewData && (
          <ProductReviewSection reviewData={reviewData} />
        )}

        <ProductOrderSection onOrderClick={handleOrderClick} />
      </ProductContainer>
    </Layout>
  );
};

// 메인 ProductDetail 컴포넌트 (ErrorBoundary로 감싸기)
const ProductDetail = () => {
  return (
    <ErrorBoundary>
      <ProductDetailContent />
    </ErrorBoundary>
  );
};

export default ProductDetail; 