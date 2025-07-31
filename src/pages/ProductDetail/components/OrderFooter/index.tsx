import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import LikeButton from './LikeButton';
import OrderButton from './OrderButton';

const Wrapper = styled.div`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${theme.semanticColors.background.default};
`;

interface OrderFooterProps {
  productId: number;
}

const OrderFooter = ({ productId }: OrderFooterProps) => {
  return (
    <Wrapper>
      <LikeButton productId={productId} />
      <OrderButton productId={productId} />
    </Wrapper>
  );
};

export default OrderFooter;
