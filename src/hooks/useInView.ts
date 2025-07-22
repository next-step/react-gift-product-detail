import { useRef, useState } from "react";
import { useEffect } from "react";

const useInView = <T extends HTMLDivElement>(threshold: number = 0.5) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entries]) => {
          setIsInView(entries.isIntersecting);
        },
        { threshold },
      );
  
      const el = ref.current;
      if (el) {
        observer.observe(el);
      }
  
      return () => {
        if (el) {
          observer.unobserve(el);
        }
      };
  }, [threshold, ref, setIsInView]);

  return { ref, isInView };
};

export default useInView;