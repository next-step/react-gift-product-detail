import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { OrderFormProvider, useOrderForm } from '@/contexts/order'
import { orderCardMock, type CardData } from '@/features/order'
import { ROUTE_PATH } from '@/shared/constants'
import { OrderCardSection, ReceiverSection, SenderSection } from '@/features/order/components'
import { Button, Loading, PageContainer, Typography } from '@/shared/components/ui'
import type { CreateOrderRequest, ProductSummary } from '@/api/types'
import { createOrder, fetchProductSummary } from '@/api/services'
import { STORAGES } from '@/api/constants'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'
import { useMutation } from '@tanstack/react-query'
import { decodeUserInfo, getCookie } from '@/shared/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import { Suspense, useEffect } from 'react'
import type { AxiosError } from 'axios'

// * 주문하기 페이지 (주문하기 폼 Provider 포함)
export const Order = () => {
  const storedUser = getCookie(STORAGES.AUTH)
  const userInfo = storedUser ? decodeUserInfo(storedUser) : null

  return (
    // * Context API를 통해 전역적으로 관리되는 주문하기 폼 적용
    <OrderFormProvider defaultSender={userInfo?.name}>
      <ErrorBoundary fallback={null}>
        <Suspense
          fallback={
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          }
        >
          <OrderContent />
        </Suspense>
      </ErrorBoundary>
    </OrderFormProvider>
  )
}

// * 주문하기 컨텐츠
export const OrderContent = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  // * URL 파라미터로 부터 상품 id 값 가져오기
  const { id } = useParams<{ id: string }>()
  // * 상품 정보 fetch (useSuspenseQuery)
  const { data: productInfo, error } = useSuspenseQuery<ProductSummary>({
    queryKey: ['productSummary', id],
    queryFn: () => fetchProductSummary(Number(id)),
  })
  // ! 404 에러 시 홈으로 이동 (기존 로직 유지)
  useEffect(() => {
    if ((error as AxiosError)?.response?.status === 404) {
      navigate(ROUTE_PATH.HOME)
    }
  }, [error, navigate])
  // * 카드 리스트
  const cardList: CardData[] = orderCardMock

  // * OrderForm 컨텍스트 사용
  const {
    form: {
      handleSubmit,
      formState: { errors },
      watch,
      control,
    },
    handleCardSelect,
    getTotalPrice,
  } = useOrderForm()

  // * 폼 데이터 실시간 추적
  const watchedData = watch()
  const { selectedCard } = watchedData

  // * React Query의 useMutation으로 주문하기 요청 관리
  const mutation = useMutation({
    // 주문하기 API 함수 (axios 기반)
    mutationFn: createOrder,
    // 주문하기 성공 시: 토스트 메시지 및 홈으로 리다이렉트
    onSuccess: (result) => {
      if (result.success) {
        toast.success('주문이 완료되었습니다!')
        navigate(ROUTE_PATH.HOME)
      }
    },
  })
  // * productInfo가 없을 때는 렌더링만 중단
  if (!productInfo) return null
  // * 폼 제출 핸들러
  const onSubmit = handleSubmit((data) => {
    if (!productInfo) return
    if (data.receivers.length === 0) {
      toast.warning('받는 사람이 최소 1명 필요합니다.')
      return
    }

    // * API 요청 데이터 생성
    const orderRequest: CreateOrderRequest = {
      productId: productInfo.id,
      message: data.cardMessage,
      messageCardId: `card${data.selectedCard.id}`,
      ordererName: data.sender,
      receivers: data.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.count,
      })),
    }

    mutation.mutate(orderRequest)
  })

  // * 주문 총액 계산
  const totalPrice = productInfo ? getTotalPrice(productInfo.price) : 0
  return (
    <OrderContainer>
      {/* 주문하기 카드 섹션 */}
      <OrderCardSection
        cardList={cardList}
        selectedCard={selectedCard}
        control={control}
        onCardSelect={handleCardSelect}
        messageError={errors.cardMessage?.message}
      />

      {/* 보내는 사람 폼 섹션 */}
      <SenderSection control={control} error={errors.sender?.message} />

      {/* 받는 사람 폼 섹션 */}
      <ReceiverSection />

      {/* 상품 정보 섹션 */}
      <ProductInfoSection>
        <SectionTitle variant="title2Bold">상품 정보</SectionTitle>
        <ProductInfo>
          <ProductImage src={productInfo?.imageURL} alt={productInfo?.name} />
          <ProductDetails>
            <ProductNameContainer>
              <ProductName variant="subtitle2Regular">{productInfo?.name}</ProductName>
              <ProductBrand variant="label2Regular">{productInfo?.brandName}</ProductBrand>
            </ProductNameContainer>
            <ProductPriceContainer>
              <ProductPriceLabel
                variant="label2Regular"
                css={{
                  color: theme.semanticColors.text.sub,
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  marginRight: theme.spacing.spacing1,
                }}
              >
                상품가
              </ProductPriceLabel>
              <ProductSellingPrice variant="title2Bold">
                {productInfo?.price.toLocaleString()}원
              </ProductSellingPrice>
            </ProductPriceContainer>
          </ProductDetails>
        </ProductInfo>
      </ProductInfoSection>

      {/* 주문하기 버튼 */}
      <OrderButtonSection>
        <OrderButton variant="kakao" size="large" onClick={onSubmit} disabled={mutation.isPending}>
          {totalPrice.toLocaleString()}원 주문하기
        </OrderButton>
      </OrderButtonSection>
    </OrderContainer>
  )
}

// * 주문하기 페이지 컨테이너
const OrderContainer = styled(PageContainer)`
  justify-content: start;
  background-color: ${({ theme }) => theme.semanticColors.background.disabled};
  gap: ${({ theme }) => theme.spacing.spacing2};
`

// * 상품 정보 섹션
const ProductInfoSection = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.spacing4} ${theme.spacing.spacing4}`};
  background-color: ${({ theme }) => theme.semanticColors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.semanticColors.border.default};

  display: flex;
  flex-direction: column;
`

// * 섹션 제목
const SectionTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`

// * 상품 정보 컨테이너
const ProductInfo = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing.spacing4};
    border: 1px solid ${theme.semanticColors.border.disabled};
    border-radius: ${theme.spacing.spacing2};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.spacing3};
  `}
`

// * 상품 이미지
const ProductImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.spacing.spacing1};
  object-fit: cover;
`

// * 상품 상세 정보
const ProductDetails = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.spacing1};
  `}
`

// * 상품 명 컨테이너
const ProductNameContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.spacing1};
  `}
`

// * 상품명
const ProductName = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.default};
`

// * 상품 브랜드
const ProductBrand = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.sub};
`

// * 상품 가격 컨테이너
const ProductPriceContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.spacing1};
    flex-wrap: wrap;
  `}
`

// * 상품 가격 라벨
const ProductPriceLabel = styled(Typography)``

// * 상품 판매가
const ProductSellingPrice = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.default};
`

// * 주문 버튼 섹션
const OrderButtonSection = styled.section`
  width: 100%;
`

// * 주문 버튼
const OrderButton = styled(Button)`
  font-weight: 700;
`

// * 로딩 컨테이너
const LoadingContainer = styled(PageContainer)`
  flex: 1;

  justify-content: center;
  background-color: ${({ theme }) => theme.semanticColors.background.default};
`

export default Order
