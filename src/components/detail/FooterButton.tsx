import styled from '@emotion/styled';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useGoToOrder } from '@/hooks/useGoTo';

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  background: #fff;
  position: sticky;
  bottom: 0;
  height: 50px;
`;

const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const LikeCount = styled.span`
  ${({ theme }) => theme.typography.label2Regular}
`;

const OrderButton = styled.button`
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: #000;
  border: none;
  ${({ theme }) => theme.typography.body1Bold};
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

interface FooterButtonProps {
  liked: boolean;
  likeCount: number;
  toggleLike: () => void;
  productId: number | string;
}

export default function FooterButton({
  liked,
  likeCount,
  toggleLike,
  productId,
}: FooterButtonProps) {
  return (
    <Wrapper>
      <LikeSection>
        <LikeButton onClick={toggleLike}>
          {liked ? <FaHeart size={20} color="#fa342c" /> : <FaRegHeart size={20} />}
        </LikeButton>
        <LikeCount>{likeCount}</LikeCount>
      </LikeSection>
      <OrderButton onClick={useGoToOrder(productId)}>주문하기</OrderButton>
    </Wrapper>
  );
}
