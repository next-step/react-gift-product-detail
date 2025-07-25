import axios from 'axios';
import { useQuery, queryOptions } from '@tanstack/react-query';

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

export const themeInfoQueryOptions = (themeId: string) =>
  queryOptions({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    retry: false,
    throwOnError: true,
  });

export const useThemeInfo = (themeId: string) => {
  return useQuery(themeInfoQueryOptions(themeId));
};
