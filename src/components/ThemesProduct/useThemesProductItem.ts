import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type FetchDataType = {
  list: Good[];
  cursor: number;
  hasMoreList: boolean;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (
  themeId: string | undefined,
  cursor_value: number
): Promise<FetchDataType> => {
  console.log(cursor_value);
  const params = { cursor: cursor_value };
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme + `/${themeId}/products`, {
    params,
  });
  const data = res.data.data;
  return data;
};
export const usePresentThemeFetch = () => {
  const { themeId } = useParams();

  const { data, isError, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchDataType>({
    queryKey: ['products', { themeId }],
    queryFn: ({ pageParam }) => {
      return getFetch(themeId, pageParam as number);
    },
    initialPageParam: 0,
    getNextPageParam: (lastData) => (lastData.hasMoreList ? lastData.cursor : null),
    select: (data) => ({
      pages: data.pages.flatMap((page) => page),
      pageParams: data.pageParams,
    }),
  });

  console.log(data?.pages);
  return {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};
