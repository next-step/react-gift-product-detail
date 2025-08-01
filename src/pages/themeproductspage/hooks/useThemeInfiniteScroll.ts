import { useRef, useCallback } from "react";
import { useThemeData } from "@/pages/themeproductspage/hooks/useThemeData";
import {
  useInitialThemeQuery,
  useNextThemeQuery,
} from "@/pages/themeproductspage/hooks/useThemeQuery";
import useIntersectionObserver from "@/pages/themeproductspage/hooks/useIntersectionObserver";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { ThemeProductResponse } from "@/types/api_types";

interface ThemeInfiniteScrollOptions {
  themeId: string;
  threshold?: number;
}

export function useThemeInfiniteScroll({
  themeId,
  threshold = 0.5,
}: ThemeInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: initialData } = useInitialThemeQuery(themeId);

  const { products, cursor, moreAvailable, append } = useThemeData(initialData);

  const {
    refetch: fetchNextPage,
    isLoading: isNextPageLoading,
    error: nextPageError,
  } = useNextThemeQuery(themeId, cursor);

  const handleFetchNext = useCallback(async () => {
    if (!moreAvailable || isNextPageLoading) return;

    const result: QueryObserverResult<ThemeProductResponse, Error> =
      await fetchNextPage();
    if (result.data) {
      append(result.data.list, result.data.cursor, result.data.hasMoreList);
    }
  }, [moreAvailable, isNextPageLoading, fetchNextPage, append]);

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: handleFetchNext,
    enabled: moreAvailable && !isNextPageLoading && products.length > 0,
    threshold,
  });

  return {
    products,
    loading: isNextPageLoading,
    moreAvailable,
    error: nextPageError,
    observerRef,
  };
}
