
import { BASIC_ENDPOINT } from '@src/assets/endpoints';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

import { useParams } from 'react-router-dom';


type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getFetch = async (themeId: string | undefined): Promise<ThemeLabel> => {
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme + `/${themeId}/info`);
  const data = res.data.data;
  return data;
};
export const usePresentThemeFetch = () => {
  const { themeId } = useParams();

  const { data, error, isLoading } = useQuery<ThemeLabel>({
    queryKey: ['productsLabel', { themeId }],
    queryFn: () => getFetch(themeId),
  });
  const label = data;
  const labelError = error;
  const isLabelLoading = isLoading;
  return {
    label,
    labelError,
    isLabelLoading,
  };
};
