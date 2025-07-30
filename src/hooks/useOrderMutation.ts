import { useMutation } from '@tanstack/react-query'
import apiInstance from '@/apis/apiInstance'

interface OrderPayload {
  productId: number
  message: string
  messageCardId: string
  ordererName: string
  receivers: {
    name: string
    phoneNumber: string
    quantity: number
  }[]
}

const order = async (payload: OrderPayload): Promise<void> => {
  const response = await apiInstance.post('/api/order', payload)
  return response.data
}

export function useOrderMutation() {
  return useMutation({ mutationFn: order })
}
