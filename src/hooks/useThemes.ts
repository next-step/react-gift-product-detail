import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/themesApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { GiftCategoryTheme } from '@/types/giftCategoryTheme';

export const useThemes = () => {
  return useQuery<GiftCategoryTheme[]>({
    queryKey: QUERY_KEYS.themes,
    queryFn: fetchThemes,
  });
};