import API from './axiosInstance';
import type { ThemeInfo } from '@/types/themeInfo';
import type { giftCategoryTheme } from '@/types/giftCategoryTheme';
import type { ThemeProductResponse } from '@/types/themeProduct'; 

export const fetchThemes = async (): Promise<giftCategoryTheme[]> => {
  const res = await API.get('/api/themes');
  return res.data.data;
};

export const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const res = await API.get(`/api/themes/${themeId}/info`);
  return res.data.data;
};

export const fetchThemeProducts = async (
  themeId: number,
  cursor = 0,
  limit = 10
): Promise<ThemeProductResponse> => {
  const res = await API.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return res.data.data; 
};
