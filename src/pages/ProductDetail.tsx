import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useProductInfo, useProductDetail, useProductHighlightReview, useProductWish, useToggleWish } from '@/api/productDetail';
import ErrorBoundary from '@/Components/ErrorBoundary';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.layout.containerPadding};
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadiusLarge};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BrandName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.3;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SellingPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const BasicPrice = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  text-decoration: line-through;
`;

const DiscountRate = styled.span`
  background: ${({ theme }) => theme.colors.red.red500};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.spacing.sm};
  font-size: 1rem;
  font-weight: 600;
`;



const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1.2rem;
`;



const DetailSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;



const DetailDescription = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.6;
  white-space: pre-line;
`;

const ReviewSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
        <ProductImage src={product.imageURL} alt={product.name} />
        
        <BrandName>{product.brandInfo.name}</BrandName>
        <ProductName>{product.name}</ProductName>
        
        <PriceSection>
          <SellingPrice>
            {product.price?.sellingPrice?.toLocaleString()}원
          </SellingPrice>
          {hasDiscount && (
            <>
              <BasicPrice>
                {product.price?.basicPrice?.toLocaleString()}원
              </BasicPrice>
              <DiscountRate>{discountRate}%</DiscountRate>
            </>
          )}
        </PriceSection>

        {/* 상품 설명은 ProductDetail API에서 가져옴 */}

        {wishData && (
          <WishButtonContainer>
            <WishButton
              isWished={wishData.isWished}
              onClick={handleToggleWish}
              disabled={toggleWishMutation.isPending}
              aria-label={wishData.isWished ? '관심 해제' : '관심 등록'}
            >
              ❤️
            </WishButton>
            <span style={{ fontSize: '1rem', color: '#666' }}>
              {wishData.wishCount}명이 관심 등록
              {wishData.isWished && ' (내가 관심 등록함)'}
            </span>
          </WishButtonContainer>
        )}

        {productDetail && (
          <DetailSection>
            <SectionTitle>상품 상세 정보</SectionTitle>
            
            <DetailDescription>{productDetail.description}</DetailDescription>

            {productDetail.announcement && productDetail.announcement.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>
                  공지사항
                </h3>
                {productDetail.announcement
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '12px 0',
                      borderBottom: index < productDetail.announcement.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontWeight: 500, color: '#666' }}>{item.name}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
              </div>
            )}
          </DetailSection>
        )}

        {reviewData && (
          <ReviewSection>
            <ReviewHeader>
              <SectionTitle>하이라이트 리뷰</SectionTitle>
              <ReviewSummary>
                <TotalReviews>총 {reviewData.totalCount}개의 리뷰</TotalReviews>
              </ReviewSummary>
            </ReviewHeader>

            {reviewData.reviews && reviewData.reviews.length > 0 ? (
              <ReviewList>
                {reviewData.reviews.map((review) => (
                  <ReviewItem key={review.id}>
                    <ReviewHeaderItem>
                      <ReviewerInfo>
                        <ReviewerName>{review.authorName}</ReviewerName>
                      </ReviewerInfo>
                    </ReviewHeaderItem>
                    <ReviewContent>{review.content}</ReviewContent>
                  </ReviewItem>
                ))}
              </ReviewList>
            ) : (
              <NoReviews>아직 리뷰가 없습니다.</NoReviews>
            )}
          </ReviewSection>
        )}

        <OrderButton onClick={handleOrderClick}>
          주문하기
        </OrderButton>
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