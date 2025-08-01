import type { ProductWish } from '@/types/product';
import { useToggleWishMutation } from '@/hooks/mutations/useToggleWishMutation';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';

interface ProductFooterProps {
  productWish: ProductWish;
  productId: number;
}

export const ProductFooter = ({ productWish, productId }: ProductFooterProps) => {
  const navigate = useNavigate();
  const toggleWishMutation = useToggleWishMutation();

  const handleToggleWish = () => {
    toggleWishMutation.mutate(productId);
  };

  const handleOrder = () => {
    navigate(`/order/${productId}`);
  };

  return (
    <FooterContainer>
      <WishButton onClick={handleToggleWish} disabled={toggleWishMutation.isPending}>
        {productWish.isWished ? '❤️' : '♡'} {productWish.wishCount}
      </WishButton>
      <OrderButton onClick={handleOrder}>선물하기</OrderButton>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 60px;
  border-top: 1px solid #eee;
  background-color: #fff;
`;

const WishButton = styled(Button)`
  flex: 1;
  background-color: #f0f0f0;
  color: #000;
`;

const OrderButton = styled(Button)`
  flex: 2;
`;