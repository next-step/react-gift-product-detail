import styled from '@emotion/styled';
import { useProductWish } from '@/hooks/useProduct';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useProductWishMutation } from '@/hooks/useProductWishMutation';

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
  const { data } = useProductWish(productId);
  const mutation = useProductWishMutation(productId);

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
