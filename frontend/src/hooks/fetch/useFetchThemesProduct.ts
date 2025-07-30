import { THEMES_PRODUCTS } from '@/api/api.ts';
import useInfiniteFetchThemesProduct from '@/hooks/fetch/useInfiniteFetchThemesProduct.ts';
import type { Product } from '@/types/products/types.ts';

interface UseFetchThemesProductResult {
  list: Product[];
  hasMore: boolean;
  fetchNextPage: () => Promise<void>;
}

export default function useFetchThemesProduct(themesId: number): UseFetchThemesProductResult {
  const url = THEMES_PRODUCTS(themesId);
  const { list, hasMore, fetchNextPage } = useInfiniteFetchThemesProduct(url);

  return {
    list,
    hasMore,
    fetchNextPage: async () => {
      await fetchNextPage();
    },
  };
}
