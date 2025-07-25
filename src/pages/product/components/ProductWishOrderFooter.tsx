import styled from "@emotion/styled";
import HeartIcon from "@/components/common/HeartIcon";

type Props = {
  currentLiked: boolean;
  currentLikeCount: number;
  isHeartLoading: boolean;
  onHeartClick: () => void;
  onOrderClick: () => void;
};

const ProductWishOrderFooter = ({
  currentLiked,
  currentLikeCount,
  isHeartLoading,
  onHeartClick,
  onOrderClick,
}: Props) => {
  return (
    <FooterWrapper>
      <WishBox onClick={onHeartClick} disabled={isHeartLoading}>
        <HeartIcon isWished={currentLiked} />
        <WishCount>{currentLikeCount.toLocaleString()}</WishCount>
      </WishBox>
      <OrderButton onClick={onOrderClick}>주문하기</OrderButton>
    </FooterWrapper>
  );
};

export default ProductWishOrderFooter;

const FooterWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: stretch;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const WishBox = styled.button`
  width: 72px;
  min-width: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const WishCount = styled.span`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.semantic.text.sub};
`;

const OrderButton = styled.button`
  flex: 1;
  height: 100%;
  background: ${({ theme }) => theme.colors.brand.kakao.yellow};
  border: none;
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
