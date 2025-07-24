import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchThemeProducts } from "@/api/theme";
import { PAGE_SIZE } from "@/constants/pagination";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useThemeProducts = (themeId: number | undefined) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["themeProducts", themeId],
    queryFn: ({ pageParam = 0 }) => {
      if (!themeId) {
        return Promise.reject(ERROR_MESSAGES.THEME.INVALID);
      }
      return fetchThemeProducts(themeId, pageParam, PAGE_SIZE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
  });

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  return {
    products,
    loading: isLoading,
    error: isError ? ERROR_MESSAGES.THEME.FAIL_TO_LOAD : null,
    hasMore: !!hasNextPage,
    fetchNext: fetchNextPage,
    isFetchingNextPage,
  };
};
