import styled from "@emotion/styled";
import Heart from "@/assets/heart.svg?react";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";
import useToggleWish from "@/api/hooks/useToggleWish";

type ProductOrderSectionProps = {
  wishCount: number;
  isWished: boolean;
  productId: string | undefined;
};

const ProductOrderSection = ({
  wishCount,
  isWished,
  productId,
}: ProductOrderSectionProps) => {
  const navigate = useNavigate();
  const { toggle } = useToggleWish({
    productId: Number(productId),
  });

  const toggleWish = () => {
    toggle(isWished);
  };

  const navigateToOrder = () => {
    navigate(ROUTE_PATH.ORDER.replace(":id", String(productId)));
  };

  return (
    <Container>
      <WishButton type="button" onClick={toggleWish}>
        <Heart
          fill={isWished ? "red" : "none"}
          stroke={isWished ? "red" : "#2a3038"}
        />
        <Count>{wishCount}</Count>
      </WishButton>
      <OrderButton type="button" onClick={navigateToOrder}>
        주문하기
      </OrderButton>
    </Container>
  );
};

export default ProductOrderSection;

const Container = styled.div`
  height: 3.125rem;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const WishButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 100%;
  cursor: pointer;
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const OrderButton = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Bold.lineHeight};
  cursor: pointer;
`;
