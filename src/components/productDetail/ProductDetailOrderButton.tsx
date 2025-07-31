import { Button } from "@/components/common";
import styled from "@emotion/styled";
import { Heart } from "lucide-react";

const ProductDetailButtonContainer = styled.div(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  maxWidth: "720px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: theme.zIndex.orderButton,
  display: "flex",
}));

const WishButton = styled.button(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.color.gray[0],
  padding: theme.spacing1,
  cursor: "pointer",
  flex: "0 0 10%",
}));

const OrderButtonWrapper = styled.div({
  flex: "1",
});

const WishCount = styled.p(({ theme }) => ({
  fontSize: theme.typography.label2Regular.fontSize,
  fontWeight: theme.typography.label2Regular.fontWeight,
  lineHeight: theme.typography.label2Regular.lineHeight,
  color: theme.color.gray[900],
}));

interface OrderButtonProps {
  onClick: () => void;
  onWishClick: () => void;
  isWished: boolean;
  wishCount: number;
}

export const ProductDetailOrderButton = ({
  onClick,
  onWishClick,
  isWished,
  wishCount,
}: OrderButtonProps) => {
  return (
    <ProductDetailButtonContainer>
      <WishButton
        onClick={onWishClick}
        aria-label={`위시리스트 ${isWished ? "제거" : "추가"} (현재 ${wishCount}개)`}
      >
        <Heart
          size={20}
          fill={isWished ? "#ef4444" : "none"}
          color={isWished ? "#ef4444" : "black"}
        />
        <WishCount>{wishCount}</WishCount>
      </WishButton>

      <OrderButtonWrapper>
        <Button variant="primary" size="large" width="100%" onClick={onClick}>
          주문하기
        </Button>
      </OrderButtonWrapper>
    </ProductDetailButtonContainer>
  );
};
