import { useNavigate, useParams } from 'react-router-dom';
import type { ThemeIdInfoData } from '@/types';
import axios from 'axios';
import { requests } from '@/api/requests';
import { ROUTE_PATH } from '@/routes/routePath';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useThemeInfo = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const navigate = useNavigate();

  const { data, error } = useQuery<ThemeIdInfoData>({
    queryKey: ['themeIdInfoData', index],
    queryFn: () => requests.fetchThemeIdInfo(index),
  });

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [error, navigate]);

  return data;
};
export default useThemeInfo;
