import { useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

import OrderBtn from '@/components/OrderBtn';
import Cards from '@/pages/Order/Cards';
import Sender from '@/pages/Order/Sender';
import Reciever from '@/pages/Order/Reciever/Reciever';
import ItemInfo from '@/pages/Order/ItemInfo';

import { cards } from '@/mocks/mockorder';

import type { ProductSummary } from '@/types/DTO/productDTO';
import type { ordersType } from '@/mocks/mockorder';
import type { orderRequsetDTO } from '@/types/DTO/orderDTO';

import { LoginInfoContext } from '@/contexts/LoginInfoContext';

import { postOrder } from '@/apis/order';
import { getSummary } from '@/apis/product';

import { OrderContainer } from '@/styles/Order/Order.styles';

export type RecieverType = {
  name: string;
  phone: string;
  count: number;
};
export type FormValues = {
  currentCardId: number;
  currentOrder: ordersType | undefined;
  text: string;
  sender: string;
  reciever: RecieverType[];
  count: number;
  cost: number;
};

function Order() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const parsedItemId = Number(orderId);
  const { userInfo } = useContext(LoginInfoContext);

  const {
    data: item,
    isLoading: isItemLoading,
    error: ItemError,
  } = useQuery<ProductSummary, AxiosError>({
    queryKey: ['productSummary', parsedItemId],
    queryFn: () => getSummary({ productId: parsedItemId }),
  });

  useEffect(() => {
    if (ItemError) {
      toast.error(`상품 정보를 불러오는 데 실패했습니다. ${ItemError.message}`);
      navigate('/');
    }
  }, [ItemError, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      currentCardId: 904,
      currentOrder: cards.find((card) => card.id === 0),
      text: cards[0].defaultTextMessage,
      sender: userInfo.name,
      reciever: [],
      count: 0,
      cost: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reciever',
  });

  const handleRecieverUpdate = (newList: RecieverType[]) => {
    const totalCount = newList.reduce((sum, r) => sum + (r.count || 0), 0);
    setValue('count', totalCount);
    if (item) setValue('cost', totalCount * item.price);
  };

  const currentCardId = watch('currentCardId');
  const cost = watch('cost');

  const orderMutation = useMutation({
    mutationFn: (orderData: orderRequsetDTO) => postOrder(orderData),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('주문이 완료되었습니다.');
        alert(
          `주문이 완료되었습니다.\n상품명: ${item?.name}\n구매 수량: ${watch('count')}\n발신자 이름: ${watch('sender')}\n메시지: ${watch('text')}`,
        );
        navigate('/');
      } else {
        toast.error('주문에 실패했습니다. 다시 시도해주세요.');
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        toast.error(`로그인이 필요합니다. ${error}`);
        navigate('/login');
      } else {
        toast.error('주문 처리 중 오류가 발생했습니다.');
      }
    },
  });

  function handleOrder(data: FormValues) {
    const orderData: orderRequsetDTO = {
      productId: parsedItemId,
      message: data.text,
      messageCardId: String(data.currentCardId),
      ordererName: data.sender,
      receivers: data.reciever.map((receiver) => ({
        name: receiver.name,
        phoneNumber: receiver.phone,
        quantity: receiver.count,
      })),
    };
    orderMutation.mutate(orderData);
  }

  if (isItemLoading) return <div>로딩 중...</div>;
  if (!item) return <div>상품 정보를 찾을 수 없습니다.</div>;
  return (
    <OrderContainer
      onSubmit={handleSubmit(
        (data) => {
          handleOrder(data);
        },
        (errors) => {
          alert(`폼 에러 ${errors}`);
        },
      )}
    >
      <Cards
        currentOrder={cards.find((card) => card.id === currentCardId)}
        register={register}
        setValue={setValue}
        currentCardId={currentCardId}
        errors={errors}
      />
      <Sender register={register} errors={errors} />
      <Reciever
        recievers={fields}
        append={append}
        remove={remove}
        onUpdate={handleRecieverUpdate}
      />
      <ItemInfo item={item} />
      <OrderBtn cost={cost} />
    </OrderContainer>
  );
}

export default Order;
