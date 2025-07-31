import { useQuery } from '@tanstack/react-query';
import { fetchThemes, fetchThemeDetail } from '@/api/theme';

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
};

export const useThemeDetail = (themeId: number) => {
  return useQuery({
    queryKey: ['themeDetail', themeId],
    queryFn: () => fetchThemeDetail(themeId),
    enabled: !!themeId,
  });
};
