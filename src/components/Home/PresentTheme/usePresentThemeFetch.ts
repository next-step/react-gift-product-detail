import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Themes } from '@src/components/Home/PresentTheme/Item/ThemeType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePresentThemeFetch = () => {
  const { data, isError, isLoading } = useQuery<Themes>({
    queryKey: ['themes'],
    queryFn: getBasicFetch,
  });

  return {
    data,
    isError,
    isLoading,
  };
};
