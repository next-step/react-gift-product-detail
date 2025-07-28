import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ItemData } from '..';
import { requests } from '@/api/requests';
import useObserver from './useObserver';

const useThemeItems = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);

  const [items, setItems] = useState<ItemData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentCursor, setCurrentCursor] = useState<number>(0);

  const loadMore = async () => {
    try {
      const data = await requests.fetchThemeIdItems({ index, currentCursor, currentPage });
      const { list, cursor, hasMoreList } = data;

      setItems(prev => [...prev, ...list]);
      setCurrentPage(prev => prev + 1);
      setCurrentCursor(cursor);
      if (hasMoreList === false) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more items:', error);
    }
  };
  const { loader } = useObserver({ items, hasMore, loadMore });

  return { items, hasMore, loader };
};

export default useThemeItems;
