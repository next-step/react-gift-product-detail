import { useQuery } from '@tanstack/react-query';
import { getThemes, getThemeInfo, getThemeProducts } from './apis';
import type { ThemeResponse, Theme } from '../types';

// 테마 목록 조회 쿼리
export function useThemesQuery(options?: any) {
  return useQuery<ThemeResponse, Error>({
    queryKey: ['themes'],
    queryFn: getThemes,
    ...options,
  });
}

// 단일 테마 정보 조회 쿼리
export function useThemeInfoQuery(themeId: string | number, options?: any) {
  return useQuery<Theme, Error>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => getThemeInfo(themeId),
    enabled: !!themeId,
    ...options,
  });
}

// 테마 상품 목록 조회 쿼리
export function useThemeProductsQuery(
  themeId: string | number,
  cursor?: number,
  options?: any
) {
  return useQuery({
    queryKey: ['themeProducts', themeId, cursor],
    queryFn: () => getThemeProducts(themeId, cursor),
    enabled: !!themeId,
    ...options,
  });
}
