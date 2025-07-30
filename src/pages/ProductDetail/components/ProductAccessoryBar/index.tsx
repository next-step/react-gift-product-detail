import type { GetProductsWishAxiosResponse } from '@/apis/domain/products/getProductsWish';
import { useReadProductsWish } from '@/apis/hooks/useReadProductsWish';
import { API_QUERY_KEY } from '@/apis/query';
import { Typography } from '@/components/common/Typography';
import { getPath } from '@/pages/Routes';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
  productId: string;
};

export const ProductDetailAccessoryBar = ({ productId }: Props) => {
  const navigate = useNavigate();
  const { data } = useReadProductsWish({ productId });
  const { wishCount, isWished } = data;

  const queryClient = useQueryClient();

  const handleWish = () => {
    queryClient.setQueryData(
      API_QUERY_KEY.products.wish(productId),
      (prev: GetProductsWishAxiosResponse) => {
        return {
          ...prev,
          data: {
            data: {
              wishCount: prev.data.data.wishCount + (isWished ? -1 : 1),
              isWished: !prev.data.data.isWished,
            },
          },
        };
      },
    );
  };

  return (
    <Wrapper>
      <WishButton onClick={handleWish}>
        <Heart
          size={20}
          strokeWidth={1.5}
          fill={isWished ? theme.colors.semantic.critical.default : 'none'}
          color={isWished ? theme.colors.semantic.critical.default : theme.colors.scale.gray900}
        />
        <Typography variant='label2Regular' style={{ fontSize: '0.625rem' }}>
          {wishCount}
        </Typography>
      </WishButton>
      <OrderButton onClick={() => navigate(getPath.order(productId))}>
        <Typography variant='body1Bold'>주문하기</Typography>
      </OrderButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const WishButton = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellow};
`;
