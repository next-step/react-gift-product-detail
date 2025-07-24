import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Product } from '../types/ThemeTypes'

interface ThemeProductResponse {
  list: Product[]
  cursor: number
  hasMoreList: boolean
}

const fetchThemeProducts = async ({
  themeId,
  cursor = 0,
  limit = 10,
}: {
  themeId: number | null
  cursor?: number
  limit?: number
}): Promise<ThemeProductResponse | null> => {
  if (!themeId) return null
  const res = await api.get(`/themes/${themeId}/products`, {
    params: { cursor, limit },
  })
  return res.data.data as ThemeProductResponse
}

export const useThemeProducts = (themeId: number | null, limit = 10) => {
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } =
    useInfiniteQuery({
      queryKey: ['themeProducts', themeId],
      queryFn: ({ pageParam = 0 }) =>
        fetchThemeProducts({ themeId, cursor: pageParam, limit }),
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined
        return lastPage.hasMoreList ? lastPage.cursor : undefined
      },
      initialPageParam: 0,
      enabled: !!themeId,
    })

  const products = data?.pages.flatMap((page) => page?.list ?? []) ?? []

  return {
    products,
    loading: isLoading,
    error,
    fetchNextPage,
    hasMore: !!hasNextPage,
    refetch,
  }
}
