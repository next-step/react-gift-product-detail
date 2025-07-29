// hooks/usePresentThemeLabel.ts
import { useParams } from 'react-router-dom';
import { useApiQuery } from '@src/hooks/useApiQuery';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';

type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export const usePresentThemeLabel = () => {
  const { themeId } = useParams<{ themeId: string }>();

  const {
    nullNotData: label,
    isError: labelError,
    isLoading: isLabelLoading,
  } = useApiQuery<ThemeLabel>({
    endpoint: `${BASIC_ENDPOINT.theme}/${themeId}/info`,
    queryKey: ['productsLabel', { themeId }],
    enabled: !!themeId,
  });

  return {
    label,
    labelError,
    isLabelLoading,
  };
};
