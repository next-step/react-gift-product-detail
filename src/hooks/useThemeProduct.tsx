import { useInfiniteQuery } from "@tanstack/react-query"
import type { ThemeProductListResponse } from "@/interfaces/ThemeProductListResponse"
import type { Product } from "@/interfaces/Product"
import useFetch from "../functions/fetchHandler"

function useThemeProduct(themeId: string, limit = 12) {
  const baseUrl = import.meta.env.VITE_BASE_URL

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<ThemeProductListResponse>({
    queryKey: ["themeProducts", themeId],
    enabled: !!themeId,
    initialPageParam: null,
    getNextPageParam: (last) =>
      last.data.hasMoreList ? last.data.cursor : undefined,
    queryFn: async ({ pageParam = null }) => {
      const url = new URL(`/api/themes/${themeId}/products`, baseUrl)
      url.searchParams.append("limit", String(limit))
      if (pageParam !== null)
        url.searchParams.append("cursor", String(pageParam))
      return useFetch<ThemeProductListResponse>(url.toString())
    },
  })

  const products: Product[] = data?.pages.flatMap((p) => p.data.list) ?? []

  return {
    products,
    loadingInitial: isLoading,
    isFetching: isFetchingNextPage,
    hasMore: !!hasNextPage,
    fetchMore: fetchNextPage,
    error,
  }
}

export default useThemeProduct
