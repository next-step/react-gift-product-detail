import { useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  onIntersect: () => void;
  enabled: boolean;
}

const useInfiniteScroll = ({
  enabled,
  onIntersect,
}: UseInfiniteScrollParams) => {
  //Ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !enabled) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [onIntersect, enabled]);
  return { sentinelRef };
};

export default useInfiniteScroll;
