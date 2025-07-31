import type { ThemeProducts } from '@features/ThemeProductList/themeProductType';
import axiosInstance from './axiosInstance';
import type { GiftTheme } from '@features/Home/components/ThemeSection';
import type { ThemeInfo } from '@features/ThemeProductList/components/ThemeHero';
import type { ProductId } from 'src/types/product';

// Home 페이지 Theme 요청 API
export const fetchThemes = async (): Promise<GiftTheme[]> => {
  const res = await axiosInstance.get('/themes');
  return res.data.data;
};

// Theme Product List 페이지 상단 Hero 정보 요청 API
export const fetchThemeInfo = async (id: ProductId): Promise<ThemeInfo> => {
  const res = await axiosInstance.get(`/themes/${id}/info`);
  return res.data.data;
};

// Theme Product List 페이지 상품 요청 API
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
