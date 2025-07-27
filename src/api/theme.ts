import axios from 'axios';
import type { ThemeInfo, Theme } from '@/types/theme';
import type { Product } from '@/types/product';
import type { BaseResponse } from '@/types/common';

export async function fetchThemes(): Promise<Theme[]> {
  const res = await axios.get<BaseResponse<Theme[]>>('/api/themes');
  return res.data.data;
}

export async function fetchThemeInfo(themeId: number) {
  const res = await axios.get<BaseResponse<ThemeInfo>>(
    `/api/themes/${themeId}/info`,
  );
  return res.data;
}

export async function fetchThemeProducts(
  themeId: number,
  cursor = 0,
  limit = 10,
) {
  const res = await axios.get<
    BaseResponse<{ list: Product[]; cursor: number; hasMoreList: boolean }>
  >(`/api/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`);
  return res.data;
}
