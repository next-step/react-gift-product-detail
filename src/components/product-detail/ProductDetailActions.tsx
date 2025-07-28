import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ROUTE_ORDER } from '@/constants';
import type { ProductWishResponse } from '@/api/types';
import { Container } from '@/components/layout';
import { useWishMutation } from '@/api/product/mutations';

interface ProductDetailActionsProps {
  productId: string;
  productWish: ProductWishResponse | null | undefined;
}

const ActionsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eeeff1;
  padding: 12px 0;
  z-index: 100;
`;

const ActionsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
`;

const WishButton = styled.button<{ isWished: boolean; isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
  padding: 8px;
  min-width: 60px;
  color: ${(props) => (props.isWished ? '#fa342c' : '#868b94')};
  transition: color 0.2s ease;
  opacity: ${(props) => (props.isLoading ? 0.6 : 1)};

  &:hover:not(:disabled) {
    color: ${(props) => (props.isWished ? '#fa342c' : '#555d6d')};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const WishIcon = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const WishCount = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const OrderButton = styled.button`
  flex: 1;
  background: #fee500;
  color: #2a3038;
  border: none;
  border-radius: 12px;
  padding: 16px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #fde047;
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const ProductDetailActions = ({
  productId,
  productWish,
}: ProductDetailActionsProps) => {
  const navigate = useNavigate();
  const wishMutation = useWishMutation();

  const handleOrderClick = () => {
    navigate(`${ROUTE_ORDER}/${productId}`);
  };

  const handleWishClick = () => {
    if (wishMutation.isPending) return; // 중복 클릭 방지
    wishMutation.mutate(productId);
  };

  const wishCount = productWish?.data.wishCount || 0;
  const isWished = productWish?.data.isWished || false;
  const isLoading = wishMutation.isPending;

  return (
    <ActionsContainer>
      <Container>
        <ActionsContent>
          <WishButton
            onClick={handleWishClick}
            disabled={isLoading}
            isWished={isWished}
            isLoading={isLoading}
          >
            <WishIcon>♥</WishIcon>
            <WishCount>{wishCount}</WishCount>
          </WishButton>
          <OrderButton onClick={handleOrderClick}>주문하기</OrderButton>
        </ActionsContent>
      </Container>
    </ActionsContainer>
  );
};

export default ProductDetailActions;
