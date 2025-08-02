import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/apis/themeInfo';
import { toast } from 'react-toastify';
import ROUTES from '@/constants/routes';
import type { themeInfo } from '@/types/themeInfo';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';
import { useState } from 'react';
import { QUERY_KEYS } from '@/constants/queryKey';

const RESPONSE_404_ERROR_MSG = '해당 ID에 일치하는 데이터가 없습니다.';

export const useThemeInfo = (themeId: string | undefined) => {
  const navigate = useNavigate();
  const [localError, setLocalError] = useState<unknown>(null);
  if (!themeId) throw new Error('themeId가 없습니다.');
  const queryFn = async () => {
    try {
      return await fetchThemeInfo(themeId);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error(RESPONSE_404_ERROR_MSG);
        navigate(ROUTES.HOME);
        setLocalError(error);
        return null as unknown as themeInfo;
      }
      throw error;
    }
  };

  const { data } = useSuspenseQuery<themeInfo | null, unknown>({
    queryKey: QUERY_KEYS.themeInfo(themeId),
    queryFn,
    staleTime: STALE_TIME,
    retry: false,
  });

  return {
    themeInfo: data,
    error: localError,
  };
};
