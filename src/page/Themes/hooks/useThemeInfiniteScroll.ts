import useIntersectionObserver from './useIntersectionObserver';
import { useInfiniteApiQuery } from './useInfiniteApiQuery';

const useThemeInfiniteScroll = () => {
  const { themeItemsQuery, items } = useInfiniteApiQuery();
  const { fetchNextPage, hasNextPage } = themeItemsQuery;

  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enable: hasNextPage,
  });

  return { items, observerRef, hasNextPage };
};

export default useThemeInfiniteScroll;
