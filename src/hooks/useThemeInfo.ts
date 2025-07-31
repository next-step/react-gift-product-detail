import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchThemeInfo, type ThemeInfo } from '@/api/theme';
import { useNavigate } from 'react-router-dom';

export function useThemeInfo(themeId: string) {
  const navigate = useNavigate();
  const {
    data: themeInfo,
    isLoading,
    isError,
    error,
  } = useQuery<ThemeInfo, Error>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => fetchThemeInfo(themeId),
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
      navigate('/');
    }
  }, [isError, navigate, error]);

  return { themeInfo, isLoading, isError, error };
}
