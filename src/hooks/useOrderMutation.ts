import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

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
  authToken: string
}

const order = async ({
  authToken,
  ...payload
}: OrderPayload): Promise<void> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/order`,
    payload,
    {
      headers: {
        Authorization: authToken || '',
      },
    }
  )
  return response.data
}

export function useOrderMutation() {
  return useMutation({ mutationFn: order })
}
