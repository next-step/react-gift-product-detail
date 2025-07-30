import { useInfiniteQuery } from "@tanstack/react-query";
import { useParamsIndex } from "./useParamsIndex";
import { requests } from "@/api/requests";

export const useInfiniteApiQuery = () => {
  const index = useParamsIndex();

  const themeItemsQuery = useInfiniteQuery({
    queryKey: ['themeIdItems', index],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => requests.fetchThemeIdItems({ index, currentCursor: pageParam }),
    getNextPageParam: lastPage => (lastPage.hasMoreList ? lastPage.cursor : undefined),
  });
  const items = themeItemsQuery.data?.pages.flatMap(page => page.list) || [];

  return { themeItemsQuery, items };
};
