import { useCallback, type RefObject } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  getThemeProducts,
  type ThemeProductResponseBody,
} from "@/api/themes/get-theme-product";
import { useInView } from "@/hooks/common/useInview";
import type { ProductType } from "@/types";
import { queryKeys } from "@/lib/query-keys";
interface UseThemeProductsResult {
  products: ProductType[];
  hasMore: boolean;
  inView: boolean;
  ref: RefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  refresh: () => void;
  isFetchingNextPage: boolean;
}

export const useGetThemeProducts = (
  themeId: number,
  limit: number = 10,
  inViewOptions?: { threshold?: number; rootMargin?: string },
): UseThemeProductsResult => {
  const {
    data,

    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.themes.productList(themeId, limit),
    queryFn: async ({ pageParam = 0 }) => {
      return await getThemeProducts({
        themeId,
        cursor: pageParam,
        limit,
      });
    },
    getNextPageParam: (lastPage: ThemeProductResponseBody) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap(page => page.list) ?? [];

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const { ref, inView } = useInView({
    callback: handleFetchNextPage,
    ...inViewOptions,
  });

  return {
    products,
    hasMore: !!hasNextPage,
    inView,
    ref,
    fetchNextPage: handleFetchNextPage,
    refresh: handleRefresh,
    isFetchingNextPage,
  };
};
