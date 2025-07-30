import { apiGet } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'

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
  const res = await apiGet<ThemeInfo>(`/themes/${themeId}/info`)
  return res
}

export const useThemeInfo = (themeId: number | null) => {
  if (!themeId) return null

  const { data: themeInfo } = useSuspenseQuery<ThemeInfo | null>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  })

  return themeInfo
}
