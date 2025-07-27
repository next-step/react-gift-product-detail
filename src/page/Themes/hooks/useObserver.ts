import { useEffect, useRef } from 'react';
import type { ItemData } from '..';

interface useObserverProps {
  items: ItemData[];
  hasMore: boolean;
  loadMore: () => void;
}

const useObserver = ({ items, hasMore, loadMore }: useObserverProps) => {
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 1.0 });

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [items, hasMore]);

  const observerCallback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting && hasMore) {
      await loadMore();
    }
  };

  return { loader };
};

export default useObserver;
