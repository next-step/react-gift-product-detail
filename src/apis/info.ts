import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type ThemeInfo = {
  themeId: number;
  name: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
};

export const fetchThemeInfo = async (themeId: string): Promise<ThemeInfo> => {
  const response = await axios.get(`/api/themes/${themeId}/info`);
  return response.data.data;
};

export const useThemeInfo = (themeId: string) => {
  return useQuery<ThemeInfo, Error>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    retry: false,
    throwOnError: true,
  });
};
