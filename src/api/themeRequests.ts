import type { ThemeIdInfoData, ThemeIdItemsData, ThemeInfo } from '@/types';
import { apiClient } from './apiClient';
interface fetchThemeIdItemsProps {
  index: number;
  currentCursor: number;
}
export const themeRequests = {
  fetchTheme: (): Promise<ThemeInfo[]> => apiClient.get('/api/themes'),
  fetchThemeIdInfo: (index: number): Promise<ThemeIdInfoData> =>
    apiClient.get(`/api/themes/${index}/info`),
  fetchThemeIdItems: ({
    index,
    currentCursor,
  }: fetchThemeIdItemsProps): Promise<ThemeIdItemsData> =>
    apiClient.get(`/api/themes/${index}/products?cursor=${currentCursor}`),
};
