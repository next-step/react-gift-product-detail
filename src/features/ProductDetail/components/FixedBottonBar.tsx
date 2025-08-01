import { useNavigate } from 'react-router-dom';
import type { ProductWishInfo } from 'src/types/product';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styled from '@emotion/styled';
import useRequiredParam from '@hooks/useRequiredParam';

interface FixedBottonBarProps {
  productWishInfo: ProductWishInfo;
  wishMutate: () => void;
}

const FixedBottonBar = ({
  productWishInfo,
  wishMutate,
}: FixedBottonBarProps) => {
  const id = useRequiredParam('id');
  const navigate = useNavigate();
  const handleOrder = () => navigate(`/order/${id}`);

  return (
    <FixedContainer>
      <WishButton onClick={wishMutate}>
        {productWishInfo.isWished ? (
          <AiFillHeart color="red" size={24} />
        ) : (
          <AiOutlineHeart size={24} />
        )}
        <span>{productWishInfo.wishCount}</span>
      </WishButton>
      <OrderButton onClick={handleOrder}>주문하기</OrderButton>
    </FixedContainer>
  );
};

export default FixedBottonBar;

const FixedContainer = styled.div(({ theme }) => ({
  position: 'fixed',
  maxWidth: '720px',
  bottom: '0',
  width: '100%',
  background: theme.colors.semantic.backgroundDefault,
  display: 'flex',
  justifyContent: 'center',
  zIndex: '999',
}));

const WishButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  border: none;
  background: transparent;
  width: 10%;
  height: 56px;

  cursor: pointer;
`;

const OrderButton = styled.button(({ theme }) => ({
  flex: '1',
  maxWidth: '720px',
  height: '56px',
  padding: theme.spacing.spacing3,
  border: 'none',
  backgroundColor: theme.colors.semantic.kakaoYellow,
  color: theme.colors.semantic.textDefault,
  ...theme.typography.body1Bold,
  cursor: 'pointer',
}));
