import { useEffect, useRef } from 'react';

interface useIntersectionObserverProps {
  onIntersect: () => void;
  enable: boolean;
}

const useIntersectionObserver = ({ onIntersect, enable = true }: useIntersectionObserverProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!enable || !el) {
      return;
    }
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, [enable, onIntersect]);

  return ref;
};

export default useIntersectionObserver;
