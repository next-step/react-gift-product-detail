import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { ThemeInfo } from '../ThemeHero/ThemeTypes';
import { api } from '@/lib/axios';

const fetchThemeInfo = async (
  themeId: number | null
): Promise<ThemeInfo | null> => {
  if (!themeId) return null;

  try {
    const res = await api.get(`/themes/${themeId}/info`);
    return res.data.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};

export const useThemeInfo = (themeId: number | null) => {
  const {
    data: themeInfo,
    isLoading: loading,
    error,
  } = useQuery<ThemeInfo | null>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
    enabled: !!themeId,
  });

  return {
    themeInfo,
    loading,
    error,
  };
};
