import { useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import type { Product } from '@/types/product'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface ThemeInfo {
  themeId: string
  name: string
  title: string
  description: string
  backgroundColor: string
}

interface FetchProductsResponse {
  list: Product[]
  cursor: number
  hasMoreList: boolean
}

const fetchThemeInfo = async (themeId: string): Promise<ThemeInfo> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/themes/${themeId}/info`
  )
  return response.data.data
}

const fetchProducts = async ({
  pageParam = 0,
  themeId,
}: {
  pageParam?: number
  themeId: string
}): Promise<FetchProductsResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/themes/${themeId}/products`,
    {
      params: { cursor: pageParam, limit: 10 },
    }
  )
  return response.data.data
}

export function useThemeInfoQuery(themeId: string) {
  return useSuspenseQuery({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    retry: false,
  })
}

export function useThemeProductsQuery(themeId: string) {
  return useInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, themeId }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined
    },
    initialPageParam: 0,
    enabled: !!themeId,
  })
}

export function useTheme(themeId?: string) {
  const observerRef = useRef<HTMLDivElement | null>(null)

  const { data: themeInfo } = useThemeInfoQuery(themeId || '')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useThemeProductsQuery(themeId || '')

  const products: Product[] = data?.pages.flatMap((page) => page.list) ?? []

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    })
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  return {
    themeInfo,
    products,
    observerRef,
  }
}
