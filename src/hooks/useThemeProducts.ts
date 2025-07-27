import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchThemeProducts, fetchThemes } from '@/api/themes'
import type { Product } from '@/type'

export default function useThemeProducts(id: string | undefined) {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    async function loadThemeProducts(themeId: number) {
      const data = await fetchThemeProducts(themeId)
      setProducts(data.list)
    }

    async function handleFallback(originalId: number) {
      try {
        const themes = await fetchThemes()
        if (themes.length === 0) {
          throw new Error('No themes')
        }
        const fallbackId = themes[0].themeId
        await loadThemeProducts(fallbackId)
        if (fallbackId !== originalId) {
          navigate(`/theme/${fallbackId}`, { replace: true })
        }
      } catch {
        setError(true)
      }
    }

    const themeId = Number(id)
    const targetId = !id || Number.isNaN(themeId) ? 0 : themeId

    try {
      await loadThemeProducts(targetId)
    } catch {
      await handleFallback(targetId)
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    setLoading(true)
    setError(false)
    load()
  }, [load])

  return { products, loading, error }
}