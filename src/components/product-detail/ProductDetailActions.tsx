import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ROUTE_ORDER } from '@/constants';
import type { ProductWishResponse } from '@/api/types';
import { Container } from '@/components/layout';

interface ProductDetailActionsProps {
  productId: string;
  productWish: ProductWishResponse | null | undefined;
  onWishClick: () => void;
  isWishLoading: boolean;
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

const WishButton = styled.button<{ isWished: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  min-width: 60px;
  color: ${(props) => (props.isWished ? '#fa342c' : '#868b94')};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.isWished ? '#fa342c' : '#555d6d')};
  }

  &:disabled {
    opacity: 0.5;
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
  onWishClick,
  isWishLoading,
}: ProductDetailActionsProps) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`${ROUTE_ORDER}/${productId}`);
  };

  const wishCount = productWish?.data.wishCount || 0;
  const isWished = productWish?.data.isWished || false;

  return (
    <ActionsContainer>
      <Container>
        <ActionsContent>
          <WishButton
            onClick={onWishClick}
            disabled={isWishLoading}
            isWished={isWished}
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
