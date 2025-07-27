import styled from '@emotion/styled';
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

const Container = styled.div`
  width: 720px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  padding-bottom: 30px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 685px;
  padding-top: 10px;
  background: #f5f6fa;
`;

const ProductInfo = styled.div`
  padding: 20px 16px;
`;

const ProductName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 0 0 8px 0;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const BrandName = styled.span`
  font-size: 14px;
  color: #666;
`;

const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  background: #fff;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#222' : '#666')};
  border-bottom: 2px solid ${({ active }) => (active ? '#222' : 'transparent')};
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: 20px 0;
  min-height: 300px;
  background: #fafbfc;
`;

const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #222;
  margin-bottom: 20px;
  padding: 0 32px;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

const AnnouncementList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
`;

const AnnouncementItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border-bottom: none;
  }
`;

const AnnouncementName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const AnnouncementValue = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
`;

const ReviewItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ReviewAuthor = styled.div`
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

const ReviewContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #444;
  white-space: pre-line;
`;

const WishSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const WishButton = styled.button<{ isWished: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: 1px solid ${({ isWished }) => (isWished ? '#ff3b30' : '#ddd')};
  border-radius: 20px;
  background: ${({ isWished }) => (isWished ? '#ff3b30' : '#fff')};
  color: ${({ isWished }) => (isWished ? '#fff' : '#666')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
`;

const WishCount = styled.span`
  font-size: 14px;
  color: #666;
`;

const OrderButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100vw;
  max-width: 720px;
  height: 56px;
  background: #ffe812;
  color: #222;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 0 0 18px 18px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #ff3b30;
`;

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
      <>
        <Header />
        <Container>
          <LoadingSpinner>상품 정보를 불러오는 중...</LoadingSpinner>
        </Container>
      </>
    );
  }

  if (errorBasic) {
    return (
      <>
        <Header />
        <Container>
          <ErrorMessage>상품 정보를 불러올 수 없습니다.</ErrorMessage>
        </Container>
      </>
    );
  }

  if (!productBasic) {
    return (
      <>
        <Header />
        <Container>
          <ErrorMessage>상품을 찾을 수 없습니다.</ErrorMessage>
        </Container>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense
        fallback={<LoadingSpinner>페이지를 불러오는 중...</LoadingSpinner>}
      >
        <Header />
        <Container>
          <ProductImage src={productBasic.imageURL} alt={productBasic.name} />

          <ProductInfo>
            <ProductName>{productBasic.name}</ProductName>
            <ProductPrice>
              {productBasic.price.sellingPrice.toLocaleString()}원
            </ProductPrice>

            <BrandInfo>
              <BrandLogo
                src={productBasic.brandInfo.imageURL}
                alt={productBasic.brandInfo.name}
              />
              <BrandName>{productBasic.brandInfo.name}</BrandName>
            </BrandInfo>

            <WishSection>
              <WishButton
                isWished={productWish?.isWished || false}
                onClick={handleWishToggle}
                disabled={wishMutation.isPending}
              >
                ♥ {productWish?.isWished ? '찜됨' : '찜하기'}
              </WishButton>
              <WishCount>{productWish?.wishCount || 0}명이 찜함</WishCount>
            </WishSection>
          </ProductInfo>

          <TabNavigation>
            <TabButton
              active={activeTab === 'description'}
              onClick={() => setActiveTab('description')}
            >
              상품설명
            </TabButton>
            <TabButton
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            >
              선물후기
            </TabButton>
            <TabButton
              active={activeTab === 'detail'}
              onClick={() => setActiveTab('detail')}
            >
              상세정보
            </TabButton>
          </TabNavigation>

          <TabContent>
            {activeTab === 'description' && (
              <ProductDescription>
                {productDetail?.description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetail.description,
                    }}
                  />
                ) : (
                  '상품 설명을 불러오는 중...'
                )}
              </ProductDescription>
            )}

            {activeTab === 'reviews' && (
              <ReviewList>
                {isLoadingReviews ? (
                  <LoadingSpinner>리뷰를 불러오는 중...</LoadingSpinner>
                ) : errorReviews ? (
                  <ErrorMessage>리뷰를 불러올 수 없습니다.</ErrorMessage>
                ) : productReviews?.reviews &&
                  productReviews.reviews.length > 0 ? (
                  productReviews.reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewAuthor>{review.authorName}</ReviewAuthor>
                      <ReviewContent>{review.content}</ReviewContent>
                    </ReviewItem>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#666',
                      padding: '40px 0',
                    }}
                  >
                    아직 리뷰가 없습니다.
                  </div>
                )}
              </ReviewList>
            )}

            {activeTab === 'detail' && (
              <AnnouncementList>
                {isLoadingDetail ? (
                  <LoadingSpinner>상세 정보를 불러오는 중...</LoadingSpinner>
                ) : errorDetail ? (
                  <ErrorMessage>상세 정보를 불러올 수 없습니다.</ErrorMessage>
                ) : productDetail?.announcements &&
                  productDetail.announcements.length > 0 ? (
                  <>
                    {productDetail.announcements.map((item, index) => (
                      <AnnouncementItem key={index}>
                        <AnnouncementName>{item.name}</AnnouncementName>
                        <AnnouncementValue>{item.value}</AnnouncementValue>
                      </AnnouncementItem>
                    ))}
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#666',
                      padding: '40px 0',
                    }}
                  >
                    상세 정보가 없습니다.
                  </div>
                )}
              </AnnouncementList>
            )}
          </TabContent>
        </Container>

        <OrderButton onClick={handleOrderClick}>주문하기</OrderButton>
      </Suspense>
    </ErrorBoundary>
  );
}

export default ProductDetailPage;
