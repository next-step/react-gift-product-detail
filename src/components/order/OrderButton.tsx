import { Button } from "@/components/common";
import { useOrderCalculation } from "@/hooks/order";
import styled from "@emotion/styled";

interface OrderButtonProps {
  onClick: () => void;
  productPrice?: number;
}

const OrderButtonContainer = styled.div(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  maxWidth: "720px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: theme.zIndex.orderButton,
}));

const OrderButtonText = styled.span(({ theme }) => ({
  fontSize: theme.typography.body1Bold.fontSize,
  fontWeight: theme.typography.body1Bold.fontWeight,
  lineHeight: theme.typography.body1Bold.lineHeight,
  color: theme.color.gray[900],
}));
export const OrderButton = ({ onClick, productPrice }: OrderButtonProps) => {
  const { totalPrice } = useOrderCalculation(productPrice);

  return (
    <OrderButtonContainer>
      <Button variant="primary" size="large" width="100%" onClick={onClick}>
        <OrderButtonText>{totalPrice}원 주문하기</OrderButtonText>
      </Button>
    </OrderButtonContainer>
  );
};
