import styled from '@emotion/styled';
import { useState } from 'react';
import { useProductWishQuery } from '@/queries/useProductDetailQuery';
import { useNavigate } from 'react-router';
import { mockToggleWish } from '@/utils/mockToggleWish';

const BottomBar = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.color.semantic.kakaoYellow};
`;

const WishButton = styled.button<{ isWished: boolean }>`
  flex: 1;
  border: none;
  background-color: ${({ theme }) => theme.color.gray.gray00};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
`;

const OrderButton = styled.button`
  flex: 12;
  border: none;
  background-color: ${({ theme }) => theme.color.semantic.kakaoYellow};
  color: ${({ theme }) => theme.color.semantic.textDefault};
  ${({ theme }) => theme.typography.body.body1Bold};
  cursor: pointer;
`;

interface Props {
  productId: number;
}

export default function ProductBottomBar({ productId }: Props) {
  const { data: wish } = useProductWishQuery(productId);
  const [isWished, setIsWished] = useState(wish.isWished);
  const [wishCount, setWishCount] = useState(wish.wishCount);
  const navigate = useNavigate();

  const handleClick = (id: number) => () => {
    navigate(`/order/${id}`);
  };

  const handleToggleWish = async () => {
    const prevWished = isWished;
    const prevCount = wishCount;
    const nextWished = !isWished;
    setIsWished(nextWished);
    setWishCount(prev => (nextWished ? prev + 1 : prev - 1));

    try {
      await mockToggleWish();
    } catch {
      setIsWished(prevWished);
      setWishCount(prevCount);
      alert('찜하기 요청 실패!');
    }
  };

  return (
    <BottomBar>
      <WishButton isWished={isWished} onClick={handleToggleWish}>
        {isWished ? '🧡' : '🤍'}
        {wishCount}
      </WishButton>
      <OrderButton onClick={handleClick(productId)}>주문하기</OrderButton>
    </BottomBar>
  );
}
