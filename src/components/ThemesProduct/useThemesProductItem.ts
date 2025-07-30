import { getFetch } from '@src/api/getFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Goods } from '@src/types/Goods';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type FetchDataType = {
  data: {
    list: Goods;
    cursor: number;
    hasMoreList: boolean;
  };
};

// const getFetch = async (
//   themeId: string | undefined,
//   cursor_value: number
// ): Promise<FetchDataType> => {
//   console.log(cursor_value);
//   const params = { cursor: cursor_value };
//   const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme + `/${themeId}/products`, {
//     params,
//   });
//   const data = res.data.data;
//   return data;
// };
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
  console.log(data);
  return {
    data: { data: data?.pages.flatMap((item) => item.data.list.data) } as Goods,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};
