import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ROUTE_PATH } from '@/routes/routePath';
import { useEffect } from 'react';
import useThemeInfoQuery from './useThemeInfoQuery';
import { useParamsIndex } from '@/hooks/useParamsIndex';

const useThemeInfo = () => {
  const index = useParamsIndex();
  const navigate = useNavigate();
  const { data, error } = useThemeInfoQuery(index);

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [error, navigate]);

  return data;
};
export default useThemeInfo;
