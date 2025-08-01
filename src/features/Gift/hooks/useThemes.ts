import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet, API_PATH } from '@/lib/axios'
import type { Theme } from '@/types/CommonTypes'

const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiGet<Theme[]>(API_PATH.THEMES)
  return res
}

export const useThemes = () => {
  const { data: themes } = useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  })
  return themes
}
