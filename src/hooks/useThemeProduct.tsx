import { useInfiniteQuery } from "@tanstack/react-query"
import type { ThemeProductListResponse } from "@/interfaces/ThemeProductListResponse"
import type { Product } from "@/interfaces/Product"
import axiosInstance from "@/utils/axiosInstance"

function useThemeProduct(themeId: string, limit = 12) {
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
      const url = `/api/themes/${themeId}/products`
      return axiosInstance
        .get<ThemeProductListResponse>(url, {
          params: {
            limit: String(limit),
            cursor: pageParam !== null ? String(pageParam) : undefined,
          },
        })
        .then((res) => res.data)
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
