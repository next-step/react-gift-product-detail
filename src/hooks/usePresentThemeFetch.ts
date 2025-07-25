import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { Themes } from '@src/components/Home/PresentTheme/Item/ThemeType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (): Promise<Themes> => {
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme);
  const data = res.data;
  return data;
};

export const usePresentThemeFetch = () => {
  const { data, isError, isLoading } = useQuery<Themes>({
    queryKey: ['themes'],
    queryFn: getFetch,
  });

  return {
    data,
    isError,
    isLoading,
  };
};
