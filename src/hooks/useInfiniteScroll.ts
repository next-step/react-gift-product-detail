import { useCallback, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

type Props = {
  hasMore: boolean;
  loading: boolean;
  fetchMore: () => void | Promise<void>;
};

export default function useInfiniteScroll({
  hasMore,
  loading,
  fetchMore,
}: Props) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore();
    }
  }, [loading, hasMore, fetchMore]);

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: handleIntersect,
    enabled: !loading && hasMore,
  });

  return {
    loaderRef,
  };
}
