import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Category } from '@/types/category';
import { CATEGORY_THEMES_API_URL } from './constants/api';

const fetchCategoryThemes = async (): Promise<Category[]> => {
  const res = await axios.get<{ data: Category[] }>(CATEGORY_THEMES_API_URL);
  return res.data.data;
};

export const useCategoryThemes = () =>
  useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: fetchCategoryThemes,
  });
