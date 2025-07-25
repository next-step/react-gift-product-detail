import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInView from "@/hooks/useInView";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import { isApiErrorResponse } from "@/types/ApiErrorResponse";
import getThemeProducts from "@/apis/themes/getThemeProducts";

const usePaginationFetch = <T>(
  themeId: string,
  limit: number = 10,
  threshold: number = 0.5,
  errorMessage: string = "데이터를 불러오는데 실패했습니다.",
) => {
  const { ref: loader, isInView } = useInView<HTMLDivElement>(threshold);

  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["themeProducts", themeId],
    queryFn: ({ pageParam }) => getThemeProducts<T>({ themeId, params: { cursor: pageParam as number, limit } }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.data.hasMoreList ? lastPage.data.data.cursor : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (error && isApiErrorResponse(error)) {
      showFetchErrorToast(error.statusCode, errorMessage);
    }
  }, [error, errorMessage]);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  const items: T[] = data?.pages.flatMap((page) => page.data.data.list) ?? [];

  return {
    items,
    isFetching,
    hasMoreList: hasNextPage ?? false,
    loader,
  };
};

export default usePaginationFetch;
