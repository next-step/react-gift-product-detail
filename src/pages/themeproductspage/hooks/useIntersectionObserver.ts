import { useEffect } from "react";

interface UseInfiniteScrollOptions {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onIntersect: (entries: IntersectionObserverEntry[]) => void;
  enabled: boolean;
  threshold?: number;
}

const useIntersectionObserver = ({
  targetRef,
  onIntersect,
  enabled,
  threshold = 0.5,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect(entries);
        }
      },
      { threshold }
    );

    const el = targetRef.current;
    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, onIntersect, targetRef, threshold]);
};

export default useIntersectionObserver;
