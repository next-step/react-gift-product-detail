import { useNavigate } from 'react-router-dom'
import * as S from './GiftCategory.styles'
import { useThemes } from '@/features/Gift/hooks/useThemes'
import { ErrorBoundary } from '@/component/Error/ErrorBoundary'
import { Suspense } from 'react'
import Loading from '@/component/Loading/Loading'

const GiftCategoryGrid = () => {
  const themes = useThemes()
  const navigate = useNavigate()

  const handleSelect = (themeId: number) => {
    navigate(`/themes/${themeId}`)
  }

  return (
    <S.Grid>
      {themes.map((theme) => (
        <S.Item key={theme.themeId} onClick={() => handleSelect(theme.themeId)}>
          <S.ItemImage src={theme.image} alt={theme.name} />
          <S.ItemName>{theme.name}</S.ItemName>
        </S.Item>
      ))}
    </S.Grid>
  )
}

const GiftCategory = () => {
  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <GiftCategoryGrid />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  )
}

export default GiftCategory
