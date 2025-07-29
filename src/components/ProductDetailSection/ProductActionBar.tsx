import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProductWish } from '@/hooks/useProductWish';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

const ProductActionBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const queryClient = useQueryClient();

  const { data } = useProductWish(productId!);
  const [wishCount, setWishCount] = useState(0);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    setWishCount(data.wishCount);
    setIsWished(data.isWished);
  }, [data]);

  const handleWishClick = () => {
    const newIsWished = !isWished;
    const newCount = newIsWished ? wishCount + 1 : Math.max(0, wishCount - 1);

    setIsWished(newIsWished);
    setWishCount(newCount);

    queryClient.setQueryData(['productWish', productId], {
      wishCount: newCount,
      isWished: newIsWished,
    });
  };

  const handleOrderClick = () => {
    if (!productId) return;
    navigate(ROUTES.ORDER(productId));
  };

  return (
    <BarWrapper>
      <WishButton onClick={handleWishClick}>
        <Heart
          size={20}
          strokeWidth={1.5}
          fill={isWished ? theme.color.red[500] : 'none'}
          color={
            isWished ? theme.color.red[500] : theme.color.semantic.text.default
          }
        />
        <WishCount>{wishCount}</WishCount>
      </WishButton>
      <Button
        backgroundColor={theme.color.semantic.kakaoYellow}
        height="60px"
        borderRadius="0"
        onClick={handleOrderClick}
      >
        주문하기
      </Button>
    </BarWrapper>
  );
};

export default ProductActionBar;

const BarWrapper = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  background-color: ${({ theme }) => theme.color.semantic.background.default};
`;

const WishButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin: 0 ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
`;

const WishCount = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
`;
