import authClient from '@/api/authClient'
import { API_ENDPOINTS } from '@/api/constants'
import type { CreateOrderRequest, CreateOrderResponse } from '@/api/types'

// * 주문 하기
export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const res = await authClient.post<{ data: CreateOrderResponse }>(API_ENDPOINTS.ORDER, orderData)
  return res.data.data
}
