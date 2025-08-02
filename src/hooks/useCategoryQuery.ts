import { useSuspenseQuery } from '@tanstack/react-query';
import type { CategoryItem, ThemeInfo} from '../types/category';
import { fetchCategories, fetchThemeInfo} from '../api/categoryApi';

export const useCategoriesQuery = () => {
  return useSuspenseQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useThemeInfoQuery = (themeId: number) => {
  return useSuspenseQuery<ThemeInfo>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  });
};
