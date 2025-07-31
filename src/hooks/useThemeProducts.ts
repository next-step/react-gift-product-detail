import { useInView } from './useInView';
import { useThemeProductsQuery } from './queries/useThemeProductsQuery';

export const useThemeProducts = (themeId: number) => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useThemeProductsQuery(themeId);

  const { ref: loadMoreRef } = useInView({
    onInView: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  return { products, isPending, isError, loadMoreRef };
};