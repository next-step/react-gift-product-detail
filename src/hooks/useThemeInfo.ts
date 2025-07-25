import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getThemeInfoUrl } from '@/hooks/constants/api';
import { ROUTES } from '@/constants/routes';
import type { ThemeInfo } from '@/types/theme';

export const useThemeInfo = (themeId: string | undefined) => {
  const navigate = useNavigate();

  const query = useQuery<ThemeInfo>({
    queryKey: ['theme-info', themeId],
    queryFn: async () => {
      if (!themeId) throw new Error('themeId is undefined');

      const res = await fetch(getThemeInfoUrl(themeId));

      if (res.status === 404) {
        navigate(ROUTES.NOT_FOUND);
        throw new Error('404 Not Found');
      }

      if (!res.ok) {
        throw new Error('Theme info fetch failed');
      }

      const json = await res.json();
      return json.data as ThemeInfo;
    },
    enabled: !!themeId,
    retry: false,
  });

  return {
    data: query.data,
    error: query.isError,
  };
};
