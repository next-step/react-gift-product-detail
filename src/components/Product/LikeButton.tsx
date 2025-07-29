import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from '@emotion/styled'

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
      const prev = queryClient.getQueryData(['wish', productId])
      queryClient.setQueryData(['wish', productId], (old: any) => ({
        ...old,
        isWished: !old.isWished,
        wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
      }))
      return { prev }
    },
    onError: (_err, _variables, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['wish', productId], context.prev)
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
