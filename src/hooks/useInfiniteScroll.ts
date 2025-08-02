import { useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollOptions {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useInfiniteScroll(
  observerRef: RefObject<HTMLElement | null>,
  { fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScrollOptions
) {
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const setupObserver = useCallback(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(observerRef.current);
    return observer;
  }, [observerRef, hasNextPage, isFetchingNextPage, handleFetchNextPage]);

  useEffect(() => {
    const observer = setupObserver();
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [setupObserver]);
}
