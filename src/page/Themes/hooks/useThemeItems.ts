import { useParams } from 'react-router-dom';
import { requests } from '@/api/requests';
import useIntersectionObserver from './useIntersectionObserver';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const useThemeItems = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['themeIdItems', index],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => requests.fetchThemeIdItems({ index, currentCursor: pageParam }),
    getNextPageParam: lastPage => (lastPage.hasMoreList ? lastPage.cursor : undefined),
  });
  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enable: hasNextPage,
  });

  const items = data?.pages.flatMap(page => page.list) || [];

  return { items, observerRef, hasNextPage };
};

export default useThemeItems;
