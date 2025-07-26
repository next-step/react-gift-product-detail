import { toast } from 'react-toastify';
import { orders } from '@/entities/order/model/constants';
import { orderSchema } from '@/entities/order/model/validation';
import type { CardState, FormData, CardStateUpdater } from './types';
import type { TextAreaChangeHandler } from '@/shared/types';

export const createCardHandlers = (setCardState: CardStateUpdater) => {
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

  return { handleCardClick, handleMessageChange };
};

export const validateOrderForm = (cardState: CardState, formData: FormData): boolean => {
  const result = orderSchema.safeParse({
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