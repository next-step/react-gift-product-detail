import styled from '@emotion/styled';
import { useProductWish } from '@/hooks/useProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import type { ProductWish } from '@/types/product';

interface ProductWishButtonProps {
  productId: number;
}

const ButtonWrapper = styled.button`
  text-align: center;
  gap: ${({ theme }) => theme.spacing.spacing1};
  background: ${({ theme }) => theme.colors.gray.gray00};
  border: none;
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  cursor: pointer;
`;

const Count = styled.span`
  ${({ theme }) => theme.typography.label1Regular};
`;

const ProductWishButton = ({ productId }: ProductWishButtonProps) => {
  const queryClient = useQueryClient();
  const { data } = useProductWish(productId);

  const mutation = useMutation({
    mutationFn: () => Promise.resolve(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productWish', productId] });

      const prevData = queryClient.getQueryData(['productWish', productId]);

      queryClient.setQueryData(['productWish', productId], (old: ProductWish | undefined) => {
        if (!old) {
          return old;
        }

        const isWished = !old.isWished;
        const wishCount = old.wishCount + (isWished ? 1 : -1);

        return { ...old, isWished, wishCount };
      });

      return { prevData };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['productWish', productId], context.prevData);
      }
    },
    /* React Query가 상태를 invalidate하면서 서버값을 다시 가져오기때문에 주석처리해두었습니다.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['productWish', productId] });
    }
    */
  });

  if (!data) {
    return null;
  }

  return (
    <ButtonWrapper onClick={() => mutation.mutate()}>
      {data.isWished ? <FaHeart color="red" /> : <FaRegHeart />}
      <Count>{data.wishCount.toLocaleString()}</Count>
    </ButtonWrapper>
  );
};

export default ProductWishButton;
