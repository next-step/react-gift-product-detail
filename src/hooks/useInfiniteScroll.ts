import { useEffect, useRef } from 'react';

// 파라미터 타입
interface UseInfiniteScrollParams {
  onIntersect: () => void;
  enabled: boolean;
}

const useInfiniteScroll = ({
  enabled,
  onIntersect,
}: UseInfiniteScrollParams) => {
  // 스크롤 관찰 대상 요소를 참조할 Ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // IntersectionObserver 객체를 저장할 ref
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // ref가 없거나 스크롤 비활성 상태면 바로 리턴
    if (!sentinelRef.current || !enabled) return;

    //기존 옵저버 해제하여 중복 관찰 방지
    observerRef.current?.disconnect();

    //옵저버 생성
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    //관찰 시작
    observerRef.current.observe(sentinelRef.current);

    //클린업
    return () => observerRef.current?.disconnect();
  }, [onIntersect, enabled]);
  return { sentinelRef };
};

export default useInfiniteScroll;
