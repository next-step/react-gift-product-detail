import { requests } from '@/api/requests';
import { useUserInfo } from '@/contexts/UserInfoContext';
import type { UserInfoProps } from '@/types';
import { toast } from 'react-toastify';

const useLogin = () => {
  const { setLoginSession } = useUserInfo();

  const loginAndStoreSession = async ({ username, password }: UserInfoProps): Promise<boolean> => {
    try {
      const userInfoData = await requests.fetchUserInfos({ username, password });
      setLoginSession(userInfoData);
      toast(userInfoData.email);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
      return false;
    }
  };

  return { loginAndStoreSession };
};

export default useLogin;
