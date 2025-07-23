import { useCallback, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import useInView from "@/hooks/useInView";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import { isErrorData } from "@/types/FetchErrorData";

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
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMoreList, setHasMoreList] = useState(true);
  const { ref: loader, isInView } = useInView<HTMLDivElement>(threshold);

  const { fetchData, isLoading } = useFetch<PaginationData<T>>(url, {
    autoFetch: false,
  });

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMoreList) return null;

    try {
      const responseData = await fetchData(undefined, undefined, {
        cursor,
        limit,
      });
      if (responseData) {
        setItems((prev) => [...prev, ...(responseData?.list ?? [])]);
        setCursor(responseData.cursor);
        setHasMoreList(responseData.hasMoreList);
      }
    } catch (error) {
      if (isErrorData(error)) {
        showFetchErrorToast(error.statusCode, errorMessage);
      }
      setHasMoreList(false);
    }
  }, [cursor, hasMoreList, isLoading, fetchData, limit, errorMessage]);

  useEffect(() => {
    if (isInView && hasMoreList && !isLoading) {
      loadMoreItems();
    }
  }, [hasMoreList, loadMoreItems, isInView, isLoading]);

  return { items, isLoading, hasMoreList, loader };
};

export default usePaginationFetch;
