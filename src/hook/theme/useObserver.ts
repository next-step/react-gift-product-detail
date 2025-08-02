import { useEffect } from 'react';

export function useProductObserver(
  loaderRef: HTMLDivElement | null,
  onIntersect: () => void
) {
  useEffect(() => {
    if (!loaderRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef);
    return () => observer.disconnect();
  }, [loaderRef, onIntersect]);
}
