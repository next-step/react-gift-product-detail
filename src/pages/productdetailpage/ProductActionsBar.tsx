/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import type { ProductWish } from "@/types/api_types";
import LikeIcon from "@/components/common/LikeIcon";
import { useState } from "react";

interface ProductActionsBarProps {
  productId: string;
  wishCount: ProductWish | undefined;
}

const ProductActionsBar = ({
  productId,
  wishCount,
}: ProductActionsBarProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(wishCount?.wishCount || 0);

  const navigateToOrder = () => {
    navigate(`/order/${productId}`);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
  };

  return (
    <Container>
      <InnerContainer>
        <LikeButton onClick={handleLikeClick}>
          <LikeIcon isLiked={isLiked} />
          <p>{count}</p>
        </LikeButton>
        <OrderButton onClick={navigateToOrder}>주문하기</OrderButton>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 1000;
  height: 60px;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
`;

const LikeButton = styled.div`
  background: white;
  font-size: 10px;
  cursor: pointer;
  flex-direction: column;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
`;

const OrderButton = styled.div`
  flex: 9;
  border: none;
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: bold;
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProductActionsBar;
