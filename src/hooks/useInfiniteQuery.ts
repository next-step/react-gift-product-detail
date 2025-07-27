import { useEffect, useState } from "react";
import useApiRequest from "./useApiRequest";
import { useInView } from "./useInView";
import usePreservedCallback from "./usePreservedCallback";

type UseInfiniteQueryProps<TRes, TItem, TParams> = {
  fetcher: (params: TParams) => Promise<TRes>;
  initialParams: TParams;
  getList: (res: TRes) => TItem[];
  getCursor: (res: TRes) => number;
  getHasMore: (res: TRes) => boolean;
};

function useInfiniteQuery<TRes, TItem, TParams>({
  fetcher,
  initialParams,
  getList,
  getCursor,
  getHasMore,
}: UseInfiniteQueryProps<TRes, TItem, TParams>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const preservedGetList = usePreservedCallback(getList);
  const preservedGetCursor = usePreservedCallback(getCursor);
  const preservedGetHasMore = usePreservedCallback(getHasMore);

  const { data, isError, isLoading, refetch } = useApiRequest({
    requestFn: () => fetcher({ ...initialParams, cursor, limit: 20 }),
    immediate: false,
  });

  useEffect(() => {
    if (
      data &&
      !isLoading &&
      !isError &&
      (!preservedGetHasMore(data) || cursor !== preservedGetCursor(data))
    ) {
      setItems(prev => [...prev, ...preservedGetList(data)]);
      setCursor(preservedGetCursor(data));
      setHasMore(preservedGetHasMore(data));
    }
  }, [
    data,
    isLoading,
    isError,
    preservedGetList,
    preservedGetCursor,
    preservedGetHasMore,
    cursor,
  ]);

  const { ref: loader } = useInView({
    callback: () => {
      if (hasMore && !isLoading) {
        refetch();
      }
    },
    threshold: 1,
    rootMargin: "50px",
  });

  return {
    items,
    isLoading,
    isError,
    loaderRef: loader,
  };
}

export default useInfiniteQuery;
