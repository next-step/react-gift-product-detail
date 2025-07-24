import styled from '@emotion/styled'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TrendFilter } from './TrendFilter'
import { ProductItem } from './ProductItem'
import { fetchProductRankList } from '@/api/services'
import { isValidRankType, isValidTargetType, RankType, TargetType, type Product } from '@/api/types'
import { useTheme } from '@emotion/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button, Loading, Typography } from '@/shared/components'
import { PRODUCT_UI_CONSTANTS } from '@/features/product/constants'
import ErrorBoundary from '@/shared/components/ErrorBoundary'

// * 초기 보여줄 상품 개수
const INITIAL_SHOW_COUNT = PRODUCT_UI_CONSTANTS.INITIAL_SHOW_COUNT

// 상품 목록, 로딩, 에러, 빈 목록만 담당하는 내부 컴포넌트
const TrendProductList = ({
  targetType,
  rankType,
  showAll,
  INITIAL_SHOW_COUNT,
  handleMoreButtonClick,
}: {
  targetType: TargetType
  rankType: RankType
  showAll: boolean
  INITIAL_SHOW_COUNT: number
  handleMoreButtonClick: () => void
}) => {
  const { data: products } = useSuspenseQuery<Product[]>({
    queryKey: ['productRankList', targetType, rankType],
    queryFn: () => fetchProductRankList(targetType, rankType),
  })
  const safeProducts = Array.isArray(products) ? products : []
  const displayProducts = showAll ? safeProducts : safeProducts.slice(0, INITIAL_SHOW_COUNT)
  const shouldShowMoreButton = safeProducts.length > INITIAL_SHOW_COUNT

  if (safeProducts.length === 0) {
    return (
      <LoadingContainer>
        <EmptyMsg variant="subtitle2Regular">상품 목록이 없습니다.</EmptyMsg>
      </LoadingContainer>
    )
  }

  return (
    <>
      <ProductContainer>
        {displayProducts.map((product: Product, index: number) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </ProductContainer>
      {shouldShowMoreButton && (
        <MoreButtonContainer>
          <Button variant="outline" size="medium" onClick={handleMoreButtonClick}>
            {showAll ? '접기' : `더보기`}
          </Button>
        </MoreButtonContainer>
      )}
    </>
  )
}

export const Trend = () => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAll, setShowAll] = useState(false)

  // * URL 파라미터에서 초기값 가져오기
  const getInitialTargetType = (): TargetType => {
    const urlTargetType = searchParams.get('targetType')
    return urlTargetType && isValidTargetType(urlTargetType) ? urlTargetType : TargetType.ALL
  }
  const getInitialRankType = (): RankType => {
    const urlRankType = searchParams.get('rankType')
    return urlRankType && isValidRankType(urlRankType) ? urlRankType : RankType.MANY_WISH
  }

  // * URL 파라미터 타입별 상태 관리
  const [targetType, setTargetType] = useState<TargetType>(getInitialTargetType)
  const [rankType, setRankType] = useState<RankType>(getInitialRankType)

  // * URL 파라미터 변경 감지
  useEffect(() => {
    const urlTargetType = searchParams.get('targetType')
    const urlRankType = searchParams.get('rankType')
    if (urlTargetType && isValidTargetType(urlTargetType)) {
      setTargetType(urlTargetType)
    }
    if (urlRankType && isValidRankType(urlRankType)) {
      setRankType(urlRankType)
    }
  }, [searchParams])

  // * 더보기 버튼 핸들러
  const handleMoreButtonClick = () => {
    setShowAll(!showAll)
  }

  // * Target 타입 필터 핸들러
  const handleTargetTypeChange = (type: TargetType) => {
    setTargetType(type)

    // * URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('targetType', type)
    setSearchParams(newSearchParams)
  }

  // * Rank 타입 필터 핸들러
  const handleRankTypeChange = (type: RankType) => {
    setRankType(type)

    // * URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('rankType', type)
    setSearchParams(newSearchParams)
  }

  return (
    <Container>
      <h1 css={theme.typography.title.title1Bold}>실시간 급상승 선물랭킹</h1>
      <TrendFilter
        targetType={targetType}
        rankType={rankType}
        onTargetTypeChange={handleTargetTypeChange}
        onRankTypeChange={handleRankTypeChange}
      />
      <ErrorBoundary fallback={<LoadingContainer>에러가 발생했습니다.</LoadingContainer>}>
        <Suspense
          fallback={
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          }
        >
          <TrendProductList
            targetType={targetType}
            rankType={rankType}
            showAll={showAll}
            INITIAL_SHOW_COUNT={INITIAL_SHOW_COUNT}
            handleMoreButtonClick={handleMoreButtonClick}
          />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}

// * 실시간 급상승 컨테이너 (section 시맨틱 태그 사용)
const Container = styled.section`
  width: 100%;
  height: fit-content;

  padding: ${({ theme }) => theme.spacing.spacing5};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.spacing5};
`

// * 실시간 급상승 상품 컨테이너
const ProductContainer = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 18.875rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${({ theme }) => theme.spacing.spacing2};
  row-gap: ${({ theme }) => theme.spacing.spacing5};
`

// * 더보기 버튼 컨테이너
const MoreButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`

// * 로딩 컨테이너
const LoadingContainer = styled.div`
  width: 100%;
  height: 18.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

// * 빈 목록 메시지
const EmptyMsg = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.sub};
`
