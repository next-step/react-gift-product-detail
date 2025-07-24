import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useReceiver } from '@/entities/receiver/model/context';
import { useAuth } from '@/entities/user/model/context';
import { z, string } from 'zod';
import { orders } from '@/entities/order/model/constants';
import { createOrder } from '@/entities/order/api/orderApi';
import { type OrderRequest} from '@/entities/order/model/types';
import { type ProductSummary } from '@/entities/product/model/types';
import { type TextAreaChangeHandler, type InputChangeHandler } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';

interface CardState {
  selectedCardId: number;
  message: string;
}

interface FormData {
  senderName: string;
}

const orderValidationSchema = z.object({
  message: string().min(1, '메시지를 입력해주세요.'),
  senderName: string().min(1, '보내는 사람 이름을 입력해주세요.'),
});

interface UseOrderFormProps {
  product?: ProductSummary;
}

export const useOrderForm = ({ product }: UseOrderFormProps = {}) => {
  const navigate = useNavigate();
  const { receiverList } = useReceiver();
  const { userInfo } = useAuth();

  const [cardState, setCardState] = useState<CardState>({
    selectedCardId: orders[0]?.id || 904,
    message: orders[0]?.defaultTextMessage || '축하해요.',
  });

  const [formData, setFormData] = useState<FormData>({
    senderName: userInfo?.name || '',
  });

  const { mutate: createOrderMutation, isPending } = useMutation({
    mutationFn: ({ orderData, token }: { orderData: OrderRequest; token: string }) => 
      createOrder(orderData, token),
    onSuccess: () => {
      const totalQuantity = receiverList.reduce((sum, receiver) => sum + receiver.quantity, 0);
      const receiverNames = receiverList.map(receiver => receiver.name).join(', ');
      
      const orderInfo = `주문이 완료되었습니다.

상품명: ${product?.name}
구매수량: ${totalQuantity}개
발신자이름: ${formData.senderName}
받는사람: ${receiverNames}
메시지: ${cardState.message}`;

      alert(orderInfo);
      navigate('/');
    },
    onError: (error: any) => {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.data?.message || '유효성 검사에 실패했습니다.');
      } else {
        toast.error('주문 처리 중 오류가 발생했습니다.');
      }
    },
  });

  const selectedCard = useMemo(() => 
    orders.find(order => order.id === cardState.selectedCardId),
    [cardState.selectedCardId]
  );

  const handleCardClick = (id: number) => {
    const card = orders.find(order => order.id === id);
    setCardState(prev => ({
      ...prev,
      selectedCardId: id,
      message: card?.defaultTextMessage || prev.message,
    }));
  };

  const handleMessageChange: TextAreaChangeHandler = (e) => {
    setCardState(prev => ({
      ...prev,
      message: e.target.value.trim(),
    }));
  };

  const handleSenderNameChange: InputChangeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      senderName: e.target.value.trim(),
    }));
  };

  const validateForm = (): boolean => {
    const result = orderValidationSchema.safeParse({
      message: cardState.message,
      senderName: formData.senderName,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return false;
    }

    return true;
  };

  const handleOrder = () => {
    if (!validateForm()) return;

    if (!product) {
      toast.error('상품 정보를 불러올 수 없습니다.');
      return;
    }

    if (!userInfo?.authToken) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const orderData: OrderRequest = {
      productId: product.id,
      message: cardState.message,
      messageCardId: cardState.selectedCardId.toString(),
      ordererName: formData.senderName,
      receivers: receiverList.map(receiver => ({
        name: receiver.name,
        phoneNumber: receiver.phone,
        quantity: receiver.quantity
      }))
    };

    createOrderMutation({ orderData, token: userInfo.authToken });
  };

  return {
    cardState,
    formData,
    selectedCard,
    handleCardClick,
    handleMessageChange,
    handleSenderNameChange,
    handleOrder,
    isPending,
  };
}; 