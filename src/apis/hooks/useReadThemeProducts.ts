import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getThemeProducts, type GetThemeProductsParams } from '../domain/themes/getThemeProducts';
import { API_QUERY_KEY } from '../query';

export const useReadThemeProducts = (props: GetThemeProductsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: API_QUERY_KEY.theme.products(props),
    queryFn: ({ pageParam }) => getThemeProducts({ ...props, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.data.data.hasMoreList ? lastPage.data.data.cursor : undefined,
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.data.list);
    },
  });
};
