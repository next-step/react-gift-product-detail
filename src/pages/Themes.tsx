import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { fetchThemeInfo, fetchThemeProducts } from '@/api/services'
import { ROUTE_PATH } from '@/shared/constants'
import { Loading, PageContainer } from '@/shared/components/ui'
import type { ThemeInfo, ThemeProductListResponse } from '@/api/types'
import { HeroSection, ProductList } from '@/features/themes'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

// * 테마 목록 상품 페이지
export const Themes = () => {
  const { id } = useParams<{ id: string }>()
  const themeId = Number(id)
  const navigate = useNavigate()

  // * Hero 정보 fetch
  const {
    data: themeInfo,
    isError: isInfoError,
    isLoading: isInfoLoading,
    error: infoError,
  } = useQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
  })

  // * 상품 리스트 페이지네이션 (useInfiniteQuery 적용)
  const {
    data: productsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useInfiniteQuery<ThemeProductListResponse>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam }) =>
      fetchThemeProducts(themeId, typeof pageParam === 'number' ? pageParam : 0, 20),
    getNextPageParam: (lastPage: ThemeProductListResponse) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
    initialPageParam: 0,
  })

  // * 페이지네이션된 상품 리스트 합치기
  const productList = productsPages
    ? (productsPages.pages as ThemeProductListResponse[]).flatMap((page) => page.list)
    : []
  const hasMore = !!hasNextPage
  const fetchMore = fetchNextPage

  // ! 404 에러 시 홈으로 이동
  useEffect(() => {
    if (isInfoError && (infoError as AxiosError)?.response?.status === 404) {
      navigate(ROUTE_PATH.HOME)
    }
  }, [isInfoError, infoError, navigate])

  // * 로딩 화면
  if (isInfoLoading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    )
  }

  if (!themeInfo) return null

  return (
    <ThemesContainer>
      {/* 히어로 영역 */}
      <HeroSection themeInfo={themeInfo} />

      {/* 상품 리스트 */}
      <ProductList
        products={productList}
        isLoading={isProductsLoading || isFetchingNextPage}
        isError={isProductsError}
        onMore={hasMore ? () => fetchMore() : undefined}
        hasMore={hasMore}
      />
    </ThemesContainer>
  )
}

// * 테마 상품 목록 컨테이너
const ThemesContainer = styled(PageContainer)`
  justify-content: start;
  align-items: start;
`
