import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/axios'
import type { Theme } from '../types/GiftTypes'

const fetchThemes = async (): Promise<Theme[]> => {
  const res = await apiGet<Theme[]>('/themes')
  return res
}

export const useThemes = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  })
  return data
}
