import { useCallback, useEffect } from "react";
import { useInfiniteQuery, type QueryFunctionContext } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import useInView from "@/hooks/useInView";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import { isErrorData, type ErrorData } from "@/types/FetchErrorData";

interface PaginationData<T> {
  list: T[];
  cursor: number;
  hasMoreList: boolean;
}

const usePaginationFetch = <T>(
  url: string,
  limit: number = 10,
  threshold: number = 0.5,
  errorMessage: string = "데이터를 불러오는데 실패했습니다.",
) => {
  const { ref: loader, isInView } = useInView<HTMLDivElement>(threshold);

  const { fetchData } = useFetch<PaginationData<T>>(url, {
    autoFetch: false,
  });

  const fetchPageData = useCallback(
    async (context: QueryFunctionContext): Promise<PaginationData<T>> => {
      const pageParam = (context.pageParam as number) ?? 0;

      const responseData = await fetchData(undefined, undefined, {
        cursor: pageParam,
        limit,
      });
      return responseData;
    },
    [limit, fetchData],
  );

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    PaginationData<T>,
    ErrorData
  >({
    queryKey: ["themeProducts", url],
    queryFn: fetchPageData,
    getNextPageParam: (lastPage: PaginationData<T>) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (error && isErrorData(error)) {
      showFetchErrorToast(error.statusCode, errorMessage);
    }
  }, [error, errorMessage]);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const items = data?.pages.flatMap((page) => page.list) ?? [];

  return {
    items,
    isLoading: isLoading || isFetchingNextPage,
    hasMoreList: hasNextPage ?? false,
    loader,
  };
};

export default usePaginationFetch;
