import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

const fetchThemeInfo = async (
  themeId: number | null
): Promise<ThemeInfo | null> => {
  if (!themeId) return null

  try {
    const res = await api.get(`/themes/${themeId}/info`)
    return res.data.data
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null
    }
    throw err
  }
}

export const useThemeInfo = (themeId: number | null) => {
  const {
    data: themeInfo,
    isLoading: loading,
    error,
  } = useQuery<ThemeInfo | null>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
  })

  return {
    themeInfo,
    loading,
    error,
  }
}
