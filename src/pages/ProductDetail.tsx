import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useProductInfo, useProductDetail, useProductHighlightReview, useProductWish, useToggleWish } from '@/api/productDetail';
import ErrorBoundary from '@/Components/ErrorBoundary';
import LoadingSpinner from '@/Components/LoadingSpinner';

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

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Category = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.gray.gray100};
  color: ${({ theme }) => theme.colors.gray.gray700};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.red.red600};
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

const SpecificationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SpecLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-weight: 500;
`;

const SpecValue = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const DeliveryInfo = styled.div`
  background: ${({ theme }) => theme.colors.gray.gray100};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DeliveryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DeliveryLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const DeliveryValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-weight: 500;
`;

const ProductImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProductImageItem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
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

const AverageRating = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const TotalReviews = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${({ filled, theme }) => filled ? theme.colors.semantic.kakaoYellow : theme.colors.gray.gray300};
  font-size: 1.2rem;
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

const ReviewDate = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ReviewStar = styled.span<{ filled: boolean }>`
  color: ${({ filled, theme }) => filled ? theme.colors.semantic.kakaoYellow : theme.colors.gray.gray300};
  font-size: 1rem;
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewImages = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ReviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.spacing.sm};
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

const WishCount = styled.span`
  font-size: 0.9rem;
  margin-left: ${({ theme }) => theme.spacing.sm};
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

  const renderStars = (rating: number, size: 'large' | 'small' = 'large') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      );
    }
    return <StarRating>{stars}</StarRating>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
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

        <Description>{product.description}</Description>
        
        <Category>카테고리: {product.category}</Category>
        
        {product.tags && product.tags.length > 0 && (
          <Tags>
            {product.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        )}

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
            
            <SpecificationsGrid>
              <SpecItem>
                <SpecLabel>무게</SpecLabel>
                <SpecValue>{productDetail.specifications.weight}</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>크기</SpecLabel>
                <SpecValue>{productDetail.specifications.size}</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>재질</SpecLabel>
                <SpecValue>{productDetail.specifications.material}</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>원산지</SpecLabel>
                <SpecValue>{productDetail.specifications.origin}</SpecValue>
              </SpecItem>
            </SpecificationsGrid>

            <DeliveryInfo>
              <DeliveryItem>
                <DeliveryLabel>배송비</DeliveryLabel>
                <DeliveryValue>{productDetail.delivery.shippingFee.toLocaleString()}원</DeliveryValue>
              </DeliveryItem>
              <DeliveryItem>
                <DeliveryLabel>무료배송 기준</DeliveryLabel>
                <DeliveryValue>{productDetail.delivery.freeShippingThreshold.toLocaleString()}원 이상</DeliveryValue>
              </DeliveryItem>
              <DeliveryItem>
                <DeliveryLabel>배송 예정일</DeliveryLabel>
                <DeliveryValue>{productDetail.delivery.estimatedDays}</DeliveryValue>
              </DeliveryItem>
            </DeliveryInfo>

            {productDetail.images && productDetail.images.length > 0 && (
              <ProductImages>
                {productDetail.images.map((image, index) => (
                  <ProductImageItem key={index} src={image} alt={`상품 이미지 ${index + 1}`} />
                ))}
              </ProductImages>
            )}

            <DetailDescription>{productDetail.description}</DetailDescription>
          </DetailSection>
        )}

        {reviewData && (
          <ReviewSection>
            <ReviewHeader>
              <SectionTitle>리뷰</SectionTitle>
              <ReviewSummary>
                <AverageRating>{reviewData.averageRating.toFixed(1)}</AverageRating>
                <TotalReviews>({reviewData.totalReviews}개)</TotalReviews>
                {renderStars(reviewData.averageRating)}
              </ReviewSummary>
            </ReviewHeader>

            {reviewData.reviews && reviewData.reviews.length > 0 ? (
              <ReviewList>
                {reviewData.reviews.map((review, index) => (
                  <ReviewItem key={index}>
                    <ReviewHeaderItem>
                      <ReviewerInfo>
                        <ReviewerName>{review.userName}</ReviewerName>
                        <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
                      </ReviewerInfo>
                      <ReviewRating>
                        {renderStars(review.rating, 'small')}
                      </ReviewRating>
                    </ReviewHeaderItem>
                    <ReviewContent>{review.content}</ReviewContent>
                    {review.images && review.images.length > 0 && (
                      <ReviewImages>
                        {review.images.map((image, imgIndex) => (
                          <ReviewImage key={imgIndex} src={image} alt={`리뷰 이미지 ${imgIndex + 1}`} />
                        ))}
                      </ReviewImages>
                    )}
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