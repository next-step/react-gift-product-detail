import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { fetchThemeInfo } from '@/api/services'
import { ROUTE_PATH } from '@/shared/constants'
import { Loading, PageContainer } from '@/shared/components/ui'
import type { ThemeInfo } from '@/api/types'
import { HeroSection, ProductList } from '@/features/themes'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import { Suspense } from 'react'

// * HeroSection 데이터 패칭 + 404 리다이렉트 래퍼
const HeroSectionWrapper = ({ themeId }: { themeId: number }) => {
  const navigate = useNavigate()

  // * Hero 정보 fetch (useSuspenseQuery로 변경)
  const { data: themeInfo, error: infoError } = useSuspenseQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  })

  // ! 404 에러 시 홈으로 이동 (기존 로직 유지)
  useEffect(() => {
    if ((infoError as AxiosError)?.response?.status === 404) {
      navigate(ROUTE_PATH.HOME)
    }
  }, [infoError, navigate])
  if (!themeInfo) return null
  return <HeroSection themeInfo={themeInfo} />
}

// * 테마 목록 상품 페이지
export const Themes = () => {
  const { id } = useParams<{ id: string }>()
  const themeId = Number(id)
  if (!themeId) return null

  return (
    <ErrorBoundary fallback={null}>
      <Suspense
        fallback={
          <PageContainer>
            <Loading />
          </PageContainer>
        }
      >
        <ThemesContainer>
          {/* 히어로 영역 */}
          <HeroSectionWrapper themeId={themeId} />

          {/* 상품 리스트 */}
          <ProductList themeId={themeId} />
        </ThemesContainer>
      </Suspense>
    </ErrorBoundary>
  )
}

// * 테마 상품 목록 컨테이너
const ThemesContainer = styled(PageContainer)`
  justify-content: start;
  align-items: start;
`
