import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { apiGet } from '@/lib/axios'

export interface WishResponse {
  wishCount: number
  isWished: boolean
}

const fetchWish = (productId: number): Promise<WishResponse> => {
  const res = apiGet<WishResponse>(`/products/${productId}/wish`)
  return res
}

const toggleWish = async ({
  productId,
  newStatus,
}: {
  productId: number
  newStatus: boolean
}): Promise<WishResponse> => {
  console.log('서버 요청 시작')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('서버 요청 완료')
  return Promise.resolve({
    wishCount: newStatus ? 1 : 0,
    isWished: newStatus,
  })
}

export const useWish = (productId: number) => {
  const queryClient = useQueryClient()

  const { data, ...queryInfo } = useSuspenseQuery<WishResponse>({
    queryKey: ['wish', productId],
    queryFn: () => fetchWish(productId),
  })

  const mutation = useMutation({
    mutationFn: (newStatus: boolean) => toggleWish({ productId, newStatus }),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['wish', productId] })
      const previousData = queryClient.getQueryData<WishResponse>([
        'wish',
        productId,
      ])

      queryClient.setQueryData<WishResponse>(['wish', productId], (old) => {
        if (!old) return old
        const updated = {
          isWished: newStatus,
          wishCount: newStatus ? old.wishCount + 1 : old.wishCount - 1,
        }
        return updated
      })

      return { previousData }
    },

    onError: (_err, _newStatus, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['wish', productId], context.previousData)
      }
    },
  })

  return {
    data,
    mutation,
    ...queryInfo,
  }
}
