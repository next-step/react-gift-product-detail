import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/themesApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { giftCategoryTheme } from '@/types/giftCategoryTheme';

export const useThemes = () => {
  return useQuery<giftCategoryTheme[]>({
    queryKey: QUERY_KEYS.themes,
    queryFn: fetchThemes,
  });
};