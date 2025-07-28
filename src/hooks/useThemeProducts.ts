import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useThemeProductsQuery,
  useThemesQuery,
} from '@/api/themes'
import type { Product } from '@/type'

export default function useThemeProducts(id: string | undefined) {
  const navigate = useNavigate()
  const themeId = Number(id)
  const validId = !id || Number.isNaN(themeId) ? 0 : themeId
  const { data, isLoading, isError } = useThemeProductsQuery(validId)
  const products: Product[] = data?.list ?? []

  const { data: themes } = useThemesQuery(undefined, { enabled: isError })

  useEffect(() => {
    if (isError && themes && themes.length > 0) {
      navigate(`/theme/${themes[0].themeId}`, { replace: true })
    }
  }, [isError, themes, navigate])

  return { products, loading: isLoading, error: isError }}