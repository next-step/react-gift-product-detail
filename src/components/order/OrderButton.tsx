import styled from '@emotion/styled';
import { zIndex } from '@/constants/zIndex';
import type { ProductSummary } from '@/types/product';
import type { Recipient } from '@/components/order/RecipientModal';

const Button = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 690px;
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray1000};
  text-align: center;
  border: none;
  z-index: ${zIndex.base};
`;

type Props = {
  product: ProductSummary;
  recipients: Recipient[];
};

const OrderButton = ({ product, recipients }: Props) => {
  const totalPrice = product.price * recipients.reduce((sum, r) => sum + r.quantity, 0);

  return <Button type="submit">{totalPrice.toLocaleString()}원 주문하기</Button>;
};

export default OrderButton;
