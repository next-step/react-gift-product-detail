import { useEffect, useRef } from 'react';

interface useIntersectionObserverProps {
  onIntersect: () => void;
  enable: boolean;
}

const useIntersectionObserver = ({ onIntersect, enable = true }: useIntersectionObserverProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enable) {
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

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [enable, onIntersect]);

  return ref;
};

export default useIntersectionObserver;
