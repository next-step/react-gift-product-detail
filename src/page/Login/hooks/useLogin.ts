import { requests } from '@/api/requests';
import { useUserInfo } from '@/contexts/UserInfoContext';
import { ROUTE_PATH } from '@/routes/routePath';
import type { UserInfoData, UserInfoProps } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogin = () => {
  const { setLoginSession } = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTE_PATH.MY;

  const { mutate } = useMutation<UserInfoData, Error, UserInfoProps>({
    mutationFn: requests.fetchUserInfos,
    onSuccess: (data: UserInfoData) => {
      setLoginSession(data);
      toast(`${data.name}님, 환영합니다!`);
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return { login: mutate };
};

export default useLogin;
