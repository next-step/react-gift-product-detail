import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchThemes, type Theme } from '@/apis/fetchThemes';
import {
  getThemeProducts,
  type GetThemeProductsResponse,
  getThemeInfo,
  type ThemeInfo,
  type ThemeID,
} from '@/apis/theme';

export function useThemesQuery() {
  return useSuspenseQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
}

export function useThemeProductsQuery(themeId: ThemeID) {
  return useSuspenseInfiniteQuery<GetThemeProductsResponse, Error>({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam = 0 }) => getThemeProducts(themeId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
  });
}

export function useThemeInfoQuery(themeId: ThemeID) {
  return useSuspenseQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => getThemeInfo(themeId),
  });
}
