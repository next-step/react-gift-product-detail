import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

function useInfiniteScroll<T extends HTMLElement = HTMLDivElement>(options: UseInfiniteScrollOptions) {
  const { loading, hasMore, onLoadMore } = options;
  const observer = useRef<IntersectionObserver | null>(null);

  const setRef = (node: T | null) => {
    if (observer.current) observer.current.disconnect();
    if (loading || !hasMore || !node) return;
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onLoadMore();
    }, { threshold: 0.1 });
    observer.current.observe(node);
  };

  useEffect(() => () => { observer.current?.disconnect(); }, []);

  return setRef;
}

export { useInfiniteScroll };
