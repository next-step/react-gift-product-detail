import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type FetchDataType = {
  data: {
    list: Good[];
    cursor: number;
    hasMoreList: boolean;
  };
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (
  themeId: string | undefined,
  cursor_value: number
): Promise<FetchDataType> => {
  console.log(cursor_value);
  const params = { cursor: cursor_value };
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme + `themes/${themeId}/products`, {
    params,
  });
  const data = res.data;
  return data;
};
export const usePresentThemeFetch = () => {
  const { themeId } = useParams();
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, error, isLoading } = useInfiniteQuery<FetchDataType>({
    queryKey: ['products', { themeId, cursor }],
    queryFn: ({ pageParam }) => {
      return getFetch(themeId, pageParam as number);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data.cursor + 10,
    // select: (data) => (data.pages ?? []).flatMap((page) => page.data),
  });
  return {
    data,
    error,
    isLoading,
    setCursor,
  };
};
