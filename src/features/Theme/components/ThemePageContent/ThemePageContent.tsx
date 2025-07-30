import { useNavigate } from 'react-router-dom'
import { useThemeInfo } from '@/features/Theme/hooks/useThemeInfo'
import { ThemeHero } from '@/features/Theme/components/ThemeHero/ThemeHero'
import ThemeProducts from '@/features/Theme/components/ThemeProducts/ThemeProducts'
import type { Product } from '@/features/Theme/types/ThemeTypes'
import { ROUTE_PATH } from '@/routes/Router'
import { useEffect } from 'react'

interface ThemePageContentProps {
  themeIdNum: number
}

const ThemePageContent = ({ themeIdNum }: ThemePageContentProps) => {
  const navigate = useNavigate()

  const themeInfo = useThemeInfo(themeIdNum)

  useEffect(() => {
    if (themeInfo === null) {
      navigate(ROUTE_PATH.GIFT, { replace: true })
    }
  }, [themeInfo, navigate])

  const handleProductSelect = (product: Product) => {
    console.log(`선택된 상품 : ${product.name}`)
    navigate(ROUTE_PATH.PRODUCT.replace(':productId', String(product.id)))
  }

  if (!themeInfo) return null

  return (
    <>
      <ThemeHero themeInfo={themeInfo} />
      <ThemeProducts
        themeId={themeIdNum}
        onProductSelect={handleProductSelect}
      />
    </>
  )
}

export default ThemePageContent
