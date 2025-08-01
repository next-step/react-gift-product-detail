import { useUserInfo } from '@/contexts/UserInfoContext';
import type { OrderInfoValues } from '@/types';
import { useForm } from 'react-hook-form';

const useInitOrderForm = () => {
  const { userInfo } = useUserInfo();
  const orderForm = useForm<OrderInfoValues>({
    defaultValues: { message: '축하해요.', name: userInfo.name, receiverInfos: [] },
  });

  return orderForm;
};

export default useInitOrderForm;
