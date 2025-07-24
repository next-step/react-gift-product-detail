import { fetchThemes } from '@/api/services'
import type { Theme } from '@/api/types'
import { Loading } from '@/shared/components'
import { useSuspenseQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import ErrorBoundary from '@/shared/components/ErrorBoundary'

// * 테마 목록만 담당하는 내부 컴포넌트
const ThemesList = () => {
  const { data: themes } = useSuspenseQuery<Theme[]>({
    queryKey: ['themesList'],
    queryFn: fetchThemes,
  })
  if (!themes || themes.length === 0) return null
  return (
    <SubContainer>
      {themes.map((themeItem) => (
        <Item to={`/themes/${themeItem.themeId}`} key={themeItem.themeId}>
          <Image src={themeItem.image} alt={themeItem.name} />
          <span css={(theme) => theme.typography.label.label2Regular}>{themeItem.name}</span>
        </Item>
      ))}
    </SubContainer>
  )
}

// * 테마(Themes) 섹션
export const ThemesSection = () => (
  <Container>
    <h1 css={(theme) => theme.typography.title.title1Bold}>선물 테마</h1>
    <ErrorBoundary fallback={null}>
      <Suspense
        fallback={
          <LoadingSubContainer>
            <Loading />
          </LoadingSubContainer>
        }
      >
        <ThemesList />
      </Suspense>
    </ErrorBoundary>
  </Container>
)

// * 테마 컨테이너 (section 시맨틱 태그 사용)
const Container = styled.section`
  ${({ theme }) => `
    width: 100%;
    height: fit-content;
    padding: ${theme.spacing.spacing5};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${theme.spacing.spacing5};
  `}
`

// * 테마 서브 컨테이너
const SubContainer = styled.div`
  ${({ theme }) => `
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: ${theme.spacing.spacing5};
  `}
`

// * 테마 아이템 - 링크 연결
const Item = styled(Link)`
  ${({ theme }) => `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing.spacing1};
  `}
`

// * 테마 이미지
const Image = styled.img`
  ${({ theme }) => `
    width: auto;
    height: 50px;
    border-radius: ${theme.spacing.spacing4};
  `}
`

// * 로딩 서브 컨테이너
const LoadingSubContainer = styled.div`
  width: 100%;
  height: 15.625rem;
`
