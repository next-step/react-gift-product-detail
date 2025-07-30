import { Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from '@/component/Error/ErrorBoundary'
import Loading from '@/component/Loading/Loading'
import ThemePageContent from '@/features/Theme/components/ThemePageContent/ThemePageContent'
import { ROUTE_PATH } from '@/routes/Router'

const ThemePage = () => {
  const navigate = useNavigate()
  const { themeId } = useParams<{ themeId: string }>()

  const themeIdNum = themeId && !isNaN(Number(themeId)) ? Number(themeId) : null

  if (!themeIdNum) {
    navigate(ROUTE_PATH.GIFT, { replace: true })
    return null
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ThemePageContent themeIdNum={themeIdNum} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ThemePage
