import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"
import type { WishResponse } from "@/interfaces/WishResponse"

export function useProductWish(productId: string) {
  const qc = useQueryClient()

  const query = useQuery<WishResponse, AxiosError, WishResponse["data"]>({
    queryKey: ["wish", productId],
    queryFn: () =>
      fetchHandler<WishResponse>(`/api/products/${productId}/wish`),
    select: (res) => res.data,
  })

  const mutation = useMutation({
    mutationFn: async () => {
      return { success: true }
    },

    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["wish", productId] })

      const prev = qc.getQueryData<WishResponse>(["wish", productId])

      if (prev) {
        qc.setQueryData<WishResponse>(["wish", productId], {
          ...prev,
          data: {
            wishCount: prev.data.wishCount + (prev.data.isWished ? -1 : 1),
            isWished: !prev.data.isWished,
          },
        })
      }
      return { prev }
    },

    onError: (_, __, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(["wish", productId], ctx.prev)
      }
    },
  })

  return {
    wishData: query.data,
    wishLoading: query.isLoading,
    toggleWish: mutation.mutate,
  }
}
