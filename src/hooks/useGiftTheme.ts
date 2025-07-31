import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/ThemeApi';
import type { GiftThemeType } from '@/types/theme';

export default function useGiftTheme() {
  return useSuspenseQuery<GiftThemeType[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });
}
