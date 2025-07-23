import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '@/apis/httpClient';
import { API_URLS } from './constants';
import type { QueryFunctionContext } from '@tanstack/react-query';

export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface ThemeProductsResponse {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

export const useGetThemeProducts = (themeId: number, limit = 10) => {
  const fetchThemeProducts = async ({ pageParam }: QueryFunctionContext) => {
    const cursor = typeof pageParam === 'number' ? pageParam : 0;
    const res = await apiClient.get(API_URLS.THEME_PRODUCTS(themeId), {
      params: { cursor, limit },
    });
    return res.data.data as ThemeProductsResponse;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, error } =
    useInfiniteQuery<ThemeProductsResponse, Error>({
      queryKey: ['theme', 'products', themeId],
      queryFn: fetchThemeProducts,
      getNextPageParam: (lastPage: ThemeProductsResponse) =>
        lastPage.hasMoreList ? lastPage.cursor : undefined,
      initialPageParam: 0,
      enabled: !!themeId,
    });

  const list = data ? data.pages.flatMap((page) => page.list) : [];

  return {
    list,
    isLoading: isFetching,
    error,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
  };
};
