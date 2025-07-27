import styled from '@emotion/styled'
import { Loading, Typography } from '@/shared/components/ui'
import type { ThemeProductListResponse } from '@/api/types'
import { ProductItem } from '@/features/product'
import { useRef } from 'react'
import { useIntersectionObserver } from '@/shared/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchThemeProducts } from '@/api/services'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import { Suspense } from 'react'

export interface ProductListProps {
  themeId: number
}

// * 상품 목록 패칭 및 처리
const ProductListInner = ({ themeId }: { themeId: number }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const {
    data: productsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ThemeProductListResponse>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam }) =>
      fetchThemeProducts(themeId, typeof pageParam === 'number' ? pageParam : 0, 20),
    getNextPageParam: (lastPage: ThemeProductListResponse) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
    initialPageParam: 0,
  })

  const hasMore = !!hasNextPage
  const fetchMore = fetchNextPage
  const canObserve = !!hasMore && !isFetchingNextPage
  useIntersectionObserver(
    loaderRef,
    () => {
      if (canObserve) fetchMore()
    },
    canObserve,
  )

  if (!productsPages) return null

  const productList = productsPages.pages
    .filter(
      (page): page is ThemeProductListResponse =>
        page && typeof page === 'object' && 'list' in page && Array.isArray(page.list),
    )
    .flatMap((page) => page.list)
  if (!productList || productList.length === 0) {
    return (
      <SubContainer>
        <Typography variant="subtitle2Regular">상품이 없습니다.</Typography>
      </SubContainer>
    )
  }
  return (
    <ProductListSection>
      <ProductContainer>
        {productList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {canObserve && <div ref={loaderRef} style={{ height: 0 }} />}
      </ProductContainer>
      {/* 추가 로딩 중일 때 하단에 로딩 표시 */}
      {isFetchingNextPage && productList.length > 0 && (
        <SubContainer>
          <Loading />
        </SubContainer>
      )}
    </ProductListSection>
  )
}

// * 상품 목록 컴포넌트
export const ProductList = ({ themeId }: ProductListProps) => (
  <ErrorBoundary fallback={null}>
    <Suspense
      fallback={
        <SubContainer>
          <Loading />
        </SubContainer>
      }
    >
      <ProductListInner themeId={themeId} />
    </Suspense>
  </ErrorBoundary>
)

// * 상품 리스트 섹션
const ProductListSection = styled.section`
  ${({ theme }) => `
    width: 100%;
    min-height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.spacing3};
  `}
`

// * 상품 리스트 컨테이너
const ProductContainer = styled.div`
  ${({ theme }) => `
    width: 100%;
    height: fit-content;
    padding: ${theme.spacing.spacing4};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: ${theme.spacing.spacing2};
    row-gap: ${theme.spacing.spacing5};
  `}
`

// * 서브 컨테이너 (로딩 or 에러 or 빈 페이지)
const SubContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`
