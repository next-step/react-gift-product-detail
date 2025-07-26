import { useQuery } from '@tanstack/react-query';
import type { CategoryItem, ThemeInfo, ThemeProductList } from '../types/category';
import { fetchCategories, fetchThemeInfo, fetchThemeProducts } from './categoryApi';

export const useCategoriesQuery = () => {
  return useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useThemeInfoQuery = (themeId: number) => {
  return useQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
  });
};

export const useThemeProductsQuery = (themeId: number, cursor: number = 0, limit: number = 10) => {
  return useQuery<ThemeProductList>({
    queryKey: ['themeProducts', themeId, cursor, limit],
    queryFn: () => fetchThemeProducts(themeId, cursor, limit),
    enabled: !!themeId,
  });
};
