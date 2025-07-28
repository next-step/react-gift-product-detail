import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Heart, HeartOff } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductWish } from '@/hooks/useProductWish';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

const ProductActionBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useProductWish(productId);

  if (isLoading) return loading;

  if (isError || !data) {
    return <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</ErrorText>;
  }

  const { wishCount, isWished } = data;

  const handleWishClick = () => {
    console.log('찜 토글 요청');
  };

  const handleOrderClick = () => {
    if (!productId) return null;
    navigate(ROUTES.ORDER(productId));
  };

  return (
    <BarWrapper>
      <WishButton onClick={handleWishClick}>
        {isWished ? (
          <Heart
            fill={theme.color.semantic.text.default}
            size={20}
            strokeWidth={1.5}
          />
        ) : (
          <HeartOff size={20} strokeWidth={1.5} />
        )}
        <WishCount>{wishCount}</WishCount>
      </WishButton>
      <Button
        backgroundColor={theme.color.semantic.kakaoYellow}
        height="56px"
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
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.color.semantic.background.default};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
`;

const WishButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.color.semantic.text.default};
  background: none;
  border: none;
  cursor: pointer;
`;

const WishCount = styled.p`
  font-size: 0.625rem;
  ${({ theme }) => theme.typography.label.label2Regular};
`;

const ErrorText = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.color.semantic.text.default};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
