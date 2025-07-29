import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from '@emotion/styled'
import type { WishInfo } from '@/types/product'

interface LikeButtonProps {
  productId: string
  wishCount: number
}

export function LikeButton({ productId, wishCount }: LikeButtonProps) {
  const queryClient = useQueryClient()

  const wishMutation = useMutation({
    mutationFn: () => Promise.resolve(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['wish', productId] })
      const prev = queryClient.getQueryData<WishInfo>(['wish', productId])

      if (prev) {
        const updated: WishInfo = {
          ...prev,
          isWished: !prev.isWished,
          wishCount: prev.isWished ? prev.wishCount - 1 : prev.wishCount + 1,
        }

        queryClient.setQueryData<WishInfo>(['wish', productId], updated)
      }

      return { prev }
    },
    onError: (_err, _variables, context) => {
      if (context?.prev) {
        queryClient.setQueryData<WishInfo>(['wish', productId], context.prev)
      }
    },
  })

  return <Button onClick={() => wishMutation.mutate()}>❤️ {wishCount}</Button>
}

const Button = styled.button`
  flex: 1;
  padding: 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
`
