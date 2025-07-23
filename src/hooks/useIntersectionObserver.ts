import { useEffect } from "react";

type Props = {
  target: React.RefObject<HTMLElement | null>;
  onIntersect: () => void | Promise<void>;
  enabled: boolean;
};

export default function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
}: Props) {
  useEffect(() => {
    if (!enabled) return;

    const element = target.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, onIntersect, enabled]);
}
