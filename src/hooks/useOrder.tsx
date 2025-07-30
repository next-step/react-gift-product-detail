import axiosInstance from "@/utils/axiosInstance"
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
  const navigate = useNavigate()

  return useMutation<
    unknown,
    AxiosError,
    { order: OrderRequest; token: string }
  >({
    mutationFn: async ({ order, token }) => {
      const { data } = await axiosInstance.post("/api/order", order, {
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
