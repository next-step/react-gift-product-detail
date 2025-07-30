// hooks/usePresentThemeLabel.ts
import { useParams } from 'react-router-dom';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { useQuery } from '@tanstack/react-query';
import { getFetch } from '@src/api/getFetch';

type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export const usePresentThemeLabel = () => {
  const { themeId } = useParams<{ themeId: string }>();

  const { data, isError, isLoading } = useQuery<ThemeLabel>({
    queryKey: ['productSummary', { themeId }],
    queryFn: () => getFetch<ThemeLabel>(`${BASIC_ENDPOINT.theme}/${themeId}/info`, {}),
  });

  return {
    data,
    isError,
    isLoading,
  };
};
