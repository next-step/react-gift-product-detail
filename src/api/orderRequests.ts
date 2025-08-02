import type { OrderInfoValues, OrderResponseData } from '@/types';
import { apiClient } from './apiClient';

interface FetchOrderProps {
  orderData: OrderInfoValues;
  index: number;
}

export const orderRequests = {
  fetchOrder: ({ orderData, index }: FetchOrderProps): Promise<OrderResponseData> => {
    const { message, name, receiverInfos } = orderData;
    const data = {
      productId: index,
      message: message,
      messageCardId: 'card123',
      ordererName: name,
      receivers: receiverInfos,
    };
    return apiClient.post('/api/order', data);
  },
};
