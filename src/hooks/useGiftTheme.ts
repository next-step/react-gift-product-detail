import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/api/ThemeApi';
import type { GiftThemeType } from '@/types/theme';

export default function useGiftTheme() {
  const {
    data: themes = [],
    isLoading: loading,
    isError: error,
  } = useQuery<GiftThemeType[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return { themes, loading, error };
}
