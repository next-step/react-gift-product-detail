import { useNavigate, useParams } from 'react-router-dom';
import type { ThemeIdInfoData } from '@/types';
import axios from 'axios';
import { requests } from '@/api/requests';
import { ROUTE_PATH } from '@/routes/routePath';
import { useQuery } from '@tanstack/react-query';

const useThemeInfo = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const navigate = useNavigate();

  const { data, isError, error } = useQuery<ThemeIdInfoData>({
    queryKey: ['themeIdInfoData', index],
    queryFn: () => requests.fetchThemeIdInfo(index),
  });

  if (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        navigate(ROUTE_PATH.HOME);
      }
    }
  }

  return { themeIdInfo: data, isError, error };
};
export default useThemeInfo;
