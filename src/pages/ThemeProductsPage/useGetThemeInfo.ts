import { useQueryApi } from '@/apis/useQueryApi';
import { API_URLS } from './constants';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const useGetThemeInfo = (themeId: number) => {
  const { data } = useQueryApi<{ data: ThemeInfo }>(
    ['theme', 'info', String(themeId)],
    API_URLS.THEME_INFO(themeId),
    { enabled: !!themeId, suspense: true }
  );

  return { themeInfo: data?.data };
};
