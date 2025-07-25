import axiosInstance from './axiosInstance';
import type { ThemeProducts } from '@features/ThemeProductList/components/ProductList';

export const fetchThemes = async () => {
  const res = await axiosInstance.get('/themes');
  return res.data.data;
};

export const fetchThemeInfo = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/themes/${id}/info`);
  return res.data.data;
};

export const fetchThemeProducts = async (
  id: number,
  cursor: number,
  limit = 10
): Promise<ThemeProducts> => {
  const res = await axiosInstance.get(`/themes/${id}/products`, {
    params: { cursor, limit },
  });
  return res.data.data;
};
