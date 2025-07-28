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
}));

const ProductDetailButtonContent = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const ProductDetailWishContainer = styled.button(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.color.gray[0],
  padding: theme.spacing1,
  cursor: "pointer",
  flex: "0 0 10%",
}));

const ProductDetailButtonTextContainer = styled.div({
  flex: "0 0 90%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ProductDetailWishCount = styled.p(({ theme }) => ({
  fontSize: theme.typography.label2Regular.fontSize,
  fontWeight: theme.typography.label2Regular.fontWeight,
  lineHeight: theme.typography.label2Regular.lineHeight,
  color: theme.color.gray[900],
  margin: 0,
}));

const ProductDetailButtonText = styled.span(({ theme }) => ({
  fontSize: theme.typography.body1Bold.fontSize,
  fontWeight: theme.typography.body1Bold.fontWeight,
  lineHeight: theme.typography.body1Bold.lineHeight,
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
      <Button variant="primary" size="large" width="100%" onClick={onClick}>
        <ProductDetailButtonContent>
          <ProductDetailWishContainer
            onClick={e => {
              e.stopPropagation();
              onWishClick();
            }}
          >
            <Heart
              size={20}
              fill={isWished ? "#ef4444" : "none"}
              color={isWished ? "#ef4444" : "black"}
            />
            <ProductDetailWishCount>{wishCount}</ProductDetailWishCount>
          </ProductDetailWishContainer>
          <ProductDetailButtonTextContainer>
            <ProductDetailButtonText>주문하기</ProductDetailButtonText>
          </ProductDetailButtonTextContainer>
        </ProductDetailButtonContent>
      </Button>
    </ProductDetailButtonContainer>
  );
};
