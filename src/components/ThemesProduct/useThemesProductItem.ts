import { getFetch } from '@src/api/getBasicFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Good } from '@src/types/Goods';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type FetchDataType = {
  data: {
    list: Good[];
    cursor: number;
    hasMoreList: boolean;
  };
};
export const usePresentThemeFetch = () => {
  const { themeId } = useParams();

  const { data, isError, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchDataType>({
    queryKey: ['products', { themeId }],
    queryFn: ({ pageParam }) => {
      return getFetch(`${BASIC_ENDPOINT.theme}/${themeId}/products`, { cursor: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastData) => (lastData.data.hasMoreList ? lastData.data.cursor : null),
    select: (data) => ({
      pages: data.pages.flatMap((page) => page),
      pageParams: data.pageParams,
    }),
  });
  return {
    data: (data?.pages ?? []).flatMap((item: FetchDataType) => item.data.list),
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};
