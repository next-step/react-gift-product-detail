import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';

import Navbar from '@/components/navbar/Navbar';
import { PaddingLg, PaddingSm, PaddingGraySm, PaddingMd } from '../components/common/Padding';
import CardMessage from '@/components/common/cardmessage/CardMessage';
import SenderForm from '@/components/order/senderform/SenderForm';
import ProductInfo from '@/components/order/ProductInfo';
import OrderBtn from '@/components/order/OrderBtn';
import CardSelector from '@/components/order/CardSelector';
import ReceiverModal from '@/components/order/receivermodal/ReceiverModal';
import ReceiverList from '@/components/order/receiverlist/ReceiverList';

import { useAuth } from '@/contexts/AuthContext';
import type { OrderFormData } from '@/components/order/receiverlist/types';
import { ROUTE_PATH } from '@/routes/Router';
import { fetchOrder, fetchProductSummary } from '@/services/orderApi';
import { useMutation, useQuery } from '@tanstack/react-query';

type SelectedCard = {
  id: number;
  message: string;
};

const Order = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId } = useParams();
  const product_id = Number(productId);

  const [selectedCard, setSelectedCard] = useState<SelectedCard>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      senderName: '',
      cardMessage: '',
      receivers: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'receivers',
  });

  const receivers = watch('receivers');

  const {
    data: summaryData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchProductSummary(product_id),
    queryKey: ['productSummary', productId],
  });
  useEffect(() => {
    if (error) {
      toast.error('상품 정보를 불러올 수 없습니다. ');
      navigate(ROUTE_PATH.HOME);
    }
  }, [error]);
  const {
    mutate: orderMutate,
    isPending: isOrderPosting,
    error: orderError,
  } = useMutation({
    mutationFn: fetchOrder,

    onSuccess: (res) => {
      toast.success('주문이 완료되었습니다!');
      navigate(ROUTE_PATH.HOME);
    },

    onError: (e) => {
      if (e.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate(ROUTE_PATH.LOGIN);
      } else {
        toast.error(e.message || '주문 중 오류가 발생했습니다.');
      }
    },
  });

  useEffect(() => {
    if (user?.name) {
      reset((prev) => ({
        ...prev,
        senderName: user.name,
      }));
    }
  }, [user, reset]);

  useEffect(() => {
    if (selectedCard?.message) {
      setValue('cardMessage', selectedCard.message);
    }
  }, [selectedCard, setValue]);
  const handleClickOrderBtn = handleSubmit((formData) => {
    const body = {
      productId: product_id,
      message: formData.cardMessage,
      messageCardId: selectedCard?.id,
      ordererName: formData.senderName,
      receivers: formData.receivers,
    };

    orderMutate({ body, token: user.token });
  });
  if (isOrderPosting || !summaryData || !user?.name) return <div>로딩중.....</div>;

  const productPrice = summaryData.price;
  const receiversTotalQuantity = receivers.reduce((sum, r) => sum + r.quantity, 0);
  const totalPrice = productPrice * receiversTotalQuantity;

  return (
    <div>
      <Navbar />
      <PaddingSm />
      <CardSelector setSelectedCard={setSelectedCard} />
      <PaddingLg />
      <CardMessage register={register} error={errors.cardMessage?.message} />
      <PaddingMd />
      <PaddingGraySm />
      <SenderForm register={register} error={errors.senderName?.message} />
      <PaddingGraySm />
      <ReceiverList fields={fields} receivers={receivers} setIsVisible={setIsModalVisible} />
      <PaddingGraySm />
      <ProductInfo product={summaryData} />
      <OrderBtn totalPrice={totalPrice} onClick={handleClickOrderBtn} />

      {isModalVisible && (
        <ReceiverModal
          setIsVisible={setIsModalVisible}
          handleSubmit={handleSubmit}
          register={register}
          control={control}
          error={errors.receivers}
        />
      )}
    </div>
  );
};

export default Order;
