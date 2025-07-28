import type { ThemeInfo, ThemeListItem } from '@/types/types';
import axios, { type AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth');
  if (raw) {
    try {
      const { authToken } = JSON.parse(raw);
      if (authToken) config.headers.Authorization = authToken;
    } catch {}
  }
  return config;
});

interface ThemeInfoResponse {
  data: ThemeInfo;
}

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const { data } = await api.get<ThemeInfoResponse>(`/api/themes/${themeId}/info`);
  return data.data;
};

interface ThemeListResponse {
  data: ThemeListItem[];
}

export const getThemeList = async (): Promise<ThemeListItem[]> => {
  const { data } = await api.get<ThemeListResponse>('/api/themes');
  return data.data;
};

export interface ProductItem {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface ThemeProductResponse {
  data: {
    list: ProductItem[];
    cursor: number;
    hasMoreList: boolean;
  };
}

export const getThemeProducts = async (themeId: number, cursor = 0, limit = 10) => {
  const { data } = await api.get<ThemeProductResponse>(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return data.data;
};
