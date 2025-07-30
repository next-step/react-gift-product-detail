import { useQuery } from '@tanstack/react-query';
import type { CategoryItem, ThemeInfo} from '../types/category';
import { fetchCategories, fetchThemeInfo} from '../api/categoryApi';

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
