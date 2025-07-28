import { PageContainer, Loading, Button, Typography } from '@/shared/components'
import { useParams, useNavigate } from 'react-router-dom'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchProductInfo,
  fetchProductDetail,
  fetchProductHighlightReview,
  fetchProductWish,
} from '@/api/services'
import type { ProductWish } from '@/api/types'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import { Suspense } from 'react'
import styled from '@emotion/styled'
import { ROUTE_PATH } from '@/shared/constants'
import { Heart } from 'lucide-react'

// * 상품 상세 페이지
export const Product = () => {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense
        fallback={
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        }
      >
        <ProductContent />
      </Suspense>
    </ErrorBoundary>
  )
}

// * 상품 상세 컨텐츠
export const ProductContent = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const productId = Number(id)

  // * 병렬로 모든 상품 데이터 요청
  const { data: productInfo } = useSuspenseQuery({
    queryKey: ['productInfo', productId],
    queryFn: () => fetchProductInfo(productId),
  })

  const { data: productDetail } = useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  })

  const { data: reviews } = useSuspenseQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => fetchProductHighlightReview(productId),
  })

  const { data: wishInfo } = useSuspenseQuery({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
  })

  // * 찜하기 토글 핸들러 (낙관적 업데이트)
  const handleWishToggle = () => {
    // 현재 데이터를 가져와서 낙관적 업데이트
    const currentWishInfo = queryClient.getQueryData<ProductWish>(['productWish', productId])

    if (currentWishInfo) {
      queryClient.setQueryData<ProductWish>(['productWish', productId], {
        ...currentWishInfo,
        isWished: !currentWishInfo.isWished,
        wishCount: currentWishInfo.isWished
          ? currentWishInfo.wishCount - 1
          : currentWishInfo.wishCount + 1,
      })
    }
  }

  // * 주문하기 핸들러
  const handleOrder = () => {
    navigate(`${ROUTE_PATH.ORDER}/${productId}`)
  }

  return (
    <ProductPageContainer>
      {/* 상품 정보 섹션 */}
      <ProductHeaderSection>
        <ProductImage src={productInfo.imageURL} alt={productInfo.name} />
        <ProductInfoContainer>
          <ProductMainInfo>
            <ProductName variant="title1Bold">{productInfo.name}</ProductName>
            <ProductPrice variant="title1Bold">
              {productInfo.price.sellingPrice.toLocaleString()}원
            </ProductPrice>
          </ProductMainInfo>
          <ProductSubInfo>
            <ProductBrandImage
              src={productInfo.brandInfo.imageURL}
              alt={productInfo.brandInfo.name}
            />
            <ProductBrand variant="title2Regular">{productInfo.brandInfo.name}</ProductBrand>
          </ProductSubInfo>
        </ProductInfoContainer>
      </ProductHeaderSection>

      {/* 상품 상세 정보 섹션 */}
      <ProductDetailSection></ProductDetailSection>

      {/* 하단 버튼 섹션 */}
      <ProductBtnSection>
        <WishButton onClick={handleWishToggle} isWished={wishInfo.isWished}>
          <Heart size={20} />
          <WishCount variant="label2Regular">{wishInfo.wishCount}</WishCount>
        </WishButton>
        <OrderButton variant="kakao" size="large" onClick={handleOrder}>
          주문하기
        </OrderButton>
      </ProductBtnSection>
    </ProductPageContainer>
  )
}

// * 상품 상세 정보 페이지 컨테이너
const ProductPageContainer = styled(PageContainer)`
  position: relative;
  justify-content: start;
`

// * 로딩 컨테이너
const LoadingContainer = styled(PageContainer)`
  justify-content: center;
  align-items: center;
`

// * 상품 이미지
const ProductImage = styled.img`
  width: 45rem;
  height: 45rem;
  object-fit: cover;
`

// * 상품 헤더 섹션
const ProductHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
`

// * 상품 정보 컨테이너
const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

// * 상품 정보 - 메인 컨테이너
const ProductMainInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};

  border-bottom: 1px solid ${({ theme }) => theme.semanticColors.border.disabled};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`

// * 상품 정보 - 서브 컨테이너
const ProductSubInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
`

// * 상품명
const ProductName = styled(Typography)``

// * 상품 가격
const ProductPrice = styled(Typography)``

// * 상품 브랜드 명
const ProductBrand = styled(Typography)``

// * 상품 브랜드 이미지
const ProductBrandImage = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 100%;
`

// * 상품 상세 정보 섹션
const ProductDetailSection = styled.section``

// * 상품 상세 정보 페이지 하단 버튼 섹션
const ProductBtnSection = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  height: 3.125rem;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.semanticColors.background.default};
  z-index: 10;

  display: flex;
`

// * 찜하기 버튼
const WishButton = styled.button<{ isWished: boolean }>`
  min-width: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  cursor: pointer;

  svg {
    color: ${({ isWished, theme }) =>
      isWished ? theme.colors.red.red700 : theme.semanticColors.text.default};
    fill: ${({ isWished, theme }) => (isWished ? theme.colors.red.red700 : 'none')};
  }
`

// * 찜 개수
const WishCount = styled(Typography)``

// * 주문하기 버튼
const OrderButton = styled(Button)`
  flex: 1;

  font-weight: ${({ theme }) => theme.typography.label.label1Bold};

  border-radius: 0;
`

export default Product
