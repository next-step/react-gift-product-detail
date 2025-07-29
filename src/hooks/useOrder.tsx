import axios from "axios"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
export interface OrderRequest {
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

export function useOrder() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const orderUrl = new URL("/api/order", baseUrl).toString()
  const navigate = useNavigate()

  return useMutation<
    unknown,
    AxiosError,
    { order: OrderRequest; token: string }
  >({
    mutationFn: async ({ order, token }) => {
      const { data } = await axios.post(orderUrl, order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      return data
    },

    onError: (err) => {
      if (err.response?.status === 401) {
        navigate("/login")
      }
    },
  })
}
