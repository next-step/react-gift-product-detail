import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useReceiver } from '@/entities/receiver/model/context';
import { useAuth } from '@/entities/user/model/context';
import { orders } from '@/entities/order/model/constants';
import { createOrder } from '@/entities/order/api/orderApi';
import { type OrderRequest} from '@/entities/order/model/types';
import { useMutation } from '@tanstack/react-query';
import { 
  DEFAULT_CARD_STATE, 
  DEFAULT_FORM_DATA, 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES, 
  ORDER_INFO_TEMPLATE 
} from './constants';
import { createCardHandlers, createFormHandlers, validateOrderForm } from './orderutils';
import type { CardState, FormData, UseOrderFormProps } from './types';

export const useOrderForm = ({ product }: UseOrderFormProps = {}) => {
  const navigate = useNavigate();
  const { receiverList } = useReceiver();
  const { userInfo } = useAuth();

  const [cardState, setCardState] = useState<CardState>(DEFAULT_CARD_STATE);

  const [formData, setFormData] = useState<FormData>({
    senderName: userInfo?.name || DEFAULT_FORM_DATA.senderName,
  });

  const { mutate: createOrderMutation, isPending } = useMutation({
    mutationFn: ({ orderData, token }: { orderData: OrderRequest; token: string }) => 
      createOrder(orderData, token),
    onSuccess: () => {
      const totalQuantity = receiverList.reduce((sum, receiver) => sum + receiver.quantity, 0);
      const receiverNames = receiverList.map(receiver => receiver.name).join(', ');
      
      const orderInfo = `${SUCCESS_MESSAGES.ORDER_COMPLETED}
${ORDER_INFO_TEMPLATE.PRODUCT_NAME}: ${product?.name}
${ORDER_INFO_TEMPLATE.QUANTITY}: ${totalQuantity}개
${ORDER_INFO_TEMPLATE.SENDER_NAME}: ${formData.senderName}
${ORDER_INFO_TEMPLATE.RECEIVERS}: ${receiverNames}
${ORDER_INFO_TEMPLATE.MESSAGE}: ${cardState.message}`;

      alert(orderInfo);
      navigate('/');
    },
    onError: (error: any) => {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.data?.message || ERROR_MESSAGES.VALIDATION_FAILED);
      } else {
        toast.error(ERROR_MESSAGES.ORDER_PROCESSING_ERROR);
      }
    },
  });

  const selectedCard = useMemo(() => 
    orders.find(order => order.id === cardState.selectedCardId),
    [cardState.selectedCardId]
  );

  const { handleCardClick, handleMessageChange } = createCardHandlers(setCardState);
  const { handleSenderNameChange } = createFormHandlers(setFormData);

  const handleOrder = () => {
    if (!validateOrderForm(cardState, formData)) return;

    if (!product) {
      toast.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      return;
    }

    if (!userInfo?.authToken) {
      toast.error(ERROR_MESSAGES.LOGIN_REQUIRED);
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