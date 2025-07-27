import { createAppError, createThemeNotFoundError, createApiError, ERROR_MESSAGES } from '../constants/errors';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeDetail {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface ThemeProduct {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ThemeProductsResponse {
  data: {
    list: ThemeProduct[];
    cursor: number;
    hasMoreList: boolean;
  };
}

export interface ThemesResponse {
  data: Theme[];
}

export interface ThemeDetailResponse {
  data: ThemeDetail;
}

// 기존 API 함수들 (React Query hooks에서 사용)
export const fetchThemes = async (): Promise<Theme[]> => {
  try {
    const response = await fetch('/api/themes');
    const data = await response.json();
    console.log('[API] /api/themes 응답:', data);
    
    if (!response.ok) {
      throw createApiError(response.status);
    }
    
    return data.data || [];
  } catch (error) {
    if (error instanceof Error) {
      throw createAppError(ERROR_MESSAGES.API_ERROR, 0, error);
    }
    throw error;
  }
};

export const fetchThemeDetail = async (themeId: number): Promise<ThemeDetail> => {
  try {
    const response = await fetch(`/api/themes/${themeId}/info`);
    const data = await response.json();
    console.log(`[API] /api/themes/${themeId}/info 응답:`, data);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw createThemeNotFoundError();
      }
      throw createApiError(response.status);
    }
    
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw createAppError(ERROR_MESSAGES.API_ERROR, 0, error);
    }
    throw error;
  }
};

export const fetchThemeProducts = async (
  themeId: number, 
  cursor: number = 0, 
  limit: number = 10
): Promise<ThemeProductsResponse['data']> => {
  try {
    const response = await fetch(`/api/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`);
    const data = await response.json();
    console.log(`[API] /api/themes/${themeId}/products 응답:`, data);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw createThemeNotFoundError();
      }
      throw createApiError(response.status);
    }
    
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw createAppError(ERROR_MESSAGES.API_ERROR, 0, error);
    }
    throw error;
  }
};

// React Query Hooks
export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
};

export const useThemeDetail = (themeId: number) => {
  return useQuery({
    queryKey: ['theme', 'detail', themeId],
    queryFn: () => fetchThemeDetail(themeId),
    enabled: !!themeId,
  });
};

export const useThemeProducts = (themeId: number, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['theme', 'products', themeId],
    queryFn: ({ pageParam = 0 }) => fetchThemeProducts(themeId, pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
    enabled: !!themeId,
  });
}; 