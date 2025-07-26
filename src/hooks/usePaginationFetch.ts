import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInView from "@/hooks/useInView";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import getThemeProducts from "@/apis/themes/getThemeProducts";
import { QUERY_KEYS } from "@/constants/queryKeys";
import axios from "axios";

const usePaginationFetch = <T>(
  themeId: string,
  limit: number = 10,
  threshold: number = 0.5,
  errorMessage: string = "데이터를 불러오는데 실패했습니다.",
) => {
  const { ref: loader, isInView } = useInView<HTMLDivElement>(threshold);

  const { data, error, isError, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: QUERY_KEYS.THEME_PRODUCTS(themeId),
    queryFn: ({ pageParam }) => getThemeProducts<T>({ themeId, params: { cursor: pageParam as number, limit } }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isError && axios.isAxiosError<ApiErrorResponse>(error)) {
      const statusCode = error.response?.data.data.statusCode as number;
      const message = error.response?.data.data.message as string;
      showFetchErrorToast(statusCode, message);
    }
  }, [isError, error, errorMessage]);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  const items: T[] = data?.pages.flatMap((page) => page.list) ?? [];

  return {
    items,
    isFetching,
    hasMoreList: hasNextPage ?? false,
    loader,
  };
};

export default usePaginationFetch;
