import apiClient from '../index';

export async function postOrder(orderData: any, authToken: string) {
  const response = await apiClient.post('/api/order', orderData, {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data.data;
}
