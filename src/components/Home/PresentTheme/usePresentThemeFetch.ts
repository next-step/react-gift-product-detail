import { getBasicFetch } from '@src/api/getBasicFetch';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Themes } from '@src/components/Home/PresentTheme/Item/ThemeType';
import { useQuery } from '@tanstack/react-query';

export const usePresentThemeFetch = () => {
  const { data, isError, isLoading } = useQuery<Themes>({
    queryKey: ['themes'],
    queryFn: () => getBasicFetch<Themes>(BASIC_ENDPOINT.theme),
  });
  return {
    data,
    isError,
    isLoading,
  };
};
