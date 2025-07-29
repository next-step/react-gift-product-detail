import { useNavigate, useParams } from 'react-router-dom';
import { useUserInfo } from '@/contexts/UserInfoContext';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/routes/routePath';
import { useForm } from 'react-hook-form';
import type { OrderInfoValues } from '@/types';
import useRanking from './useRanking';
import { useMutation } from '@tanstack/react-query';
import { requests } from '@/api/requests';
import axios from 'axios';
import { useEffect } from 'react';

const useOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productSummaryData, isError } = useRanking(id as string);

  useEffect(() => {
    if (isError) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [isError, navigate]);

  const { userInfo } = useUserInfo();
  const orderForm = useForm<OrderInfoValues>({
    defaultValues: { message: '축하해요.', name: userInfo.name, receiverInfos: [] },
  });
  const orderData = orderForm.getValues();
  const price = orderData.receiverInfos.length * (productSummaryData?.price || 0);

  const { mutate: order } = useMutation({
    mutationFn: requests.fetchOrder,
    onSuccess: data => {
      alert(`
      주문이 완료되었습니다.
      상품명: ${productSummaryData?.name}
      구매 수량: ${orderData.receiverInfos.length}
      발신자 이름: ${orderData.name}
      메시지: ${orderData.message}`);
      navigate(ROUTE_PATH.HOME);
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.data?.data?.statusCode;
        if (status === 401) {
          navigate(ROUTE_PATH.LOGIN);
        }
      }
    },
  });

  const onSubmit = async (formData: OrderInfoValues) => {
    if (!id) return;
    if (orderData.receiverInfos.length === 0) {
      toast('받는 사람이 없습니다');
      return;
    }
    order({ orderData: formData, id });
  };

  return { orderForm, onSubmit, price, productSummaryData };
};

export default useOrderForm;
