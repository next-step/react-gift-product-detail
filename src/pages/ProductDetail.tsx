import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from '@/Components/layout/Layout';
import { useProductInfo, useProductDetail, useProductHighlightReview, useProductWish, useToggleWish } from '@/api/productDetail';

const ProductContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.layout.containerPadding};
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.gray.gray300};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BrandName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const ProductName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.4;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SellingPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const BasicPrice = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  text-decoration: line-through;
`;

const DiscountRate = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.red.red700};
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray800};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Category = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.gray.gray100};
  color: ${({ theme }) => theme.colors.gray.gray700};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.red.red700};
`;

// 상품 세부 정보 섹션 스타일
const DetailSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SpecificationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SpecLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-weight: 500;
`;

const SpecValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-weight: 500;
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
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DeliveryLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const DeliveryValue = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-weight: 500;
`;

const ProductImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProductImageItem = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.gray.gray300};
`;

const DetailDescription = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray.gray800};
  line-height: 1.6;
  white-space: pre-line;
`;

// 리뷰 섹션 스타일
const ReviewSection = styled.section`
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

const AverageRating = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const TotalReviews = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${({ theme, filled }) => 
    filled ? theme.colors.yellow.yellow600 : theme.colors.gray.gray400
  };
  font-size: 1.2rem;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ReviewItem = styled.div`
  background: ${({ theme }) => theme.colors.gray.gray100};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
`;

const ReviewHeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ReviewerName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const ReviewDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ReviewStar = styled.span<{ filled: boolean }>`
  color: ${({ theme, filled }) => 
    filled ? theme.colors.yellow.yellow600 : theme.colors.gray.gray400
  };
  font-size: 0.9rem;
`;

const ReviewContent = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray.gray800};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewImages = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ReviewImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.gray.gray300};
`;

const NoReviews = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 1rem;
`;

// 관심 등록 버튼 스타일
const WishButton = styled.button<{ isWished: boolean }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${({ theme, isWished }) => 
    isWished ? theme.colors.red.red700 : theme.colors.semantic.backgroundDefault
  };
  color: ${({ theme, isWished }) => 
    isWished ? theme.colors.semantic.backgroundDefault : theme.colors.gray.gray700
  };
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (min-width: 768px) {
    bottom: ${({ theme }) => theme.spacing.xl};
    right: ${({ theme }) => theme.spacing.xl};
  }
`;

const WishCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.red.red700};
  color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  line-height: 1;
`;

const WishButtonContainer = styled.div`
  position: relative;
`;

const ProductDetail = () => {
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
    return (
      <Layout>
        <ErrorMessage>
          상품 정보를 불러오는데 실패했습니다.
        </ErrorMessage>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <ErrorMessage>상품을 찾을 수 없습니다.</ErrorMessage>
      </Layout>
    );
  }

  const hasDiscount = product.price.discountRate > 0;
  const hasBasicPrice = product.price.basicPrice > product.price.sellingPrice;

  // 별점 렌더링 헬퍼 함수
  const renderStars = (rating: number, size: 'large' | 'small' = 'large') => {
    const stars = [];
    const StarComponent = size === 'large' ? Star : ReviewStar;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarComponent key={i} filled={i <= rating}>
          ★
        </StarComponent>
      );
    }
    return stars;
  };

  // 날짜 포맷팅 헬퍼 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 관심 등록 토글 핸들러
  const handleToggleWish = async () => {
    try {
      await toggleWishMutation.mutateAsync();
    } catch (error) {
      console.error('관심 등록 토글 실패:', error);
    }
  };

  return (
    <Layout>
      <ProductContainer>
        {/* 관심 등록 버튼 */}
        {wishData && (
          <WishButtonContainer>
            <WishButton
              isWished={wishData.isWished}
              onClick={handleToggleWish}
              disabled={toggleWishMutation.isPending}
              aria-label={wishData.isWished ? '관심 해제' : '관심 등록'}
            >
              {wishData.isWished ? '❤️' : '🤍'}
            </WishButton>
            {wishData.wishCount > 0 && (
              <WishCount>{wishData.wishCount}</WishCount>
            )}
          </WishButtonContainer>
        )}
        <ProductImage src={product.imageURL} alt={product.name} />
        
        <BrandName>{product.brandInfo.name}</BrandName>
        <ProductName>{product.name}</ProductName>
        
        <PriceSection>
          <SellingPrice>
            {product.price.sellingPrice.toLocaleString()}원
          </SellingPrice>
          {hasDiscount && hasBasicPrice && (
            <>
              <BasicPrice>
                {product.price.basicPrice.toLocaleString()}원
              </BasicPrice>
              <DiscountRate>
                {product.price.discountRate}%
              </DiscountRate>
            </>
          )}
        </PriceSection>

        {/* 관심 등록 정보 */}
        {wishData && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '16px',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <span>❤️ {wishData.wishCount}명이 관심 등록</span>
            {wishData.isWished && (
              <span style={{ color: '#e74c3c', fontWeight: '600' }}>
                (내가 관심 등록함)
              </span>
            )}
          </div>
        )}

        <Description>{product.description}</Description>
        
        <Category>카테고리: {product.category}</Category>
        
        {product.tags.length > 0 && (
          <Tags>
            {product.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        )}

        {/* 상품 세부 정보 섹션 */}
        {productDetail && (
          <DetailSection>
            <SectionTitle>상품 상세 정보</SectionTitle>
            
            {/* 상품 사양 */}
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

            {/* 배송 정보 */}
            <DeliveryInfo>
              <DeliveryItem>
                <DeliveryLabel>배송비</DeliveryLabel>
                <DeliveryValue>
                  {productDetail.delivery.shippingFee === 0 
                    ? '무료' 
                    : `${productDetail.delivery.shippingFee.toLocaleString()}원`
                  }
                </DeliveryValue>
              </DeliveryItem>
              <DeliveryItem>
                <DeliveryLabel>무료배송 기준</DeliveryLabel>
                <DeliveryValue>
                  {productDetail.delivery.freeShippingThreshold.toLocaleString()}원 이상
                </DeliveryValue>
              </DeliveryItem>
              <DeliveryItem>
                <DeliveryLabel>배송 예정일</DeliveryLabel>
                <DeliveryValue>{productDetail.delivery.estimatedDays}</DeliveryValue>
              </DeliveryItem>
            </DeliveryInfo>

            {/* 상품 이미지들 */}
            {productDetail.images.length > 0 && (
              <>
                <SectionTitle>상품 이미지</SectionTitle>
                <ProductImages>
                  {productDetail.images.map((image, index) => (
                    <ProductImageItem 
                      key={index} 
                      src={image} 
                      alt={`${product.name} 이미지 ${index + 1}`} 
                    />
                  ))}
                </ProductImages>
              </>
            )}

            {/* 상세 설명 */}
            {productDetail.description && (
              <>
                <SectionTitle>상세 설명</SectionTitle>
                <DetailDescription>{productDetail.description}</DetailDescription>
              </>
            )}
          </DetailSection>
        )}

        {/* 리뷰 섹션 */}
        {reviewData && (
          <ReviewSection>
            <SectionTitle>리뷰</SectionTitle>
            
            <ReviewHeader>
              <ReviewSummary>
                <AverageRating>{reviewData.averageRating.toFixed(1)}</AverageRating>
                <StarRating>
                  {renderStars(Math.round(reviewData.averageRating))}
                </StarRating>
              </ReviewSummary>
              <TotalReviews>
                총 {reviewData.totalReviews}개의 리뷰
              </TotalReviews>
            </ReviewHeader>

            {reviewData.reviews.length > 0 ? (
              <ReviewList>
                {reviewData.reviews.map((review) => (
                  <ReviewItem key={review.id}>
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
                        {review.images.map((image, index) => (
                          <ReviewImage 
                            key={index} 
                            src={image} 
                            alt={`리뷰 이미지 ${index + 1}`} 
                          />
                        ))}
                      </ReviewImages>
                    )}
                  </ReviewItem>
                ))}
              </ReviewList>
            ) : (
              <NoReviews>
                아직 리뷰가 없습니다.
              </NoReviews>
            )}
          </ReviewSection>
        )}
      </ProductContainer>
    </Layout>
  );
};

export default ProductDetail; 