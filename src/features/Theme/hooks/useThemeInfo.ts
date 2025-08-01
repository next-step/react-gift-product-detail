import { apiGet, API_PATH } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo | null> => {
  const res = await apiGet<ThemeInfo>(API_PATH.THEME_INFO(themeId))
  return res
}

export const useThemeInfo = (themeId: number) => {
  const { data: themeInfo } = useSuspenseQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  })

  return themeInfo
}
