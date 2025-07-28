/** @jsxImportSource @emotion/react */
import { css, type Theme as ThemeType } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useWishInfo, fetchAddWishSuccess } from '../../apis/product_detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FixedBottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.pathname.match(/^\/detail\/(\d+)$/);
  const productId = match?.[1];
  const queryClient = useQueryClient();

  const { data: wish } = useWishInfo(productId || '');

  const mutation = useMutation<boolean, Error, boolean, { previousWish?: any }>(
    {
      mutationFn: fetchAddWishSuccess,
      onMutate: async (newWish: boolean) => {
        if (!productId) return;

        const previousWish = queryClient.getQueryData(['wishInfo', productId]);

        // 낙관적 업데이트
        queryClient.setQueryData(['wishInfo', productId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            isWished: newWish,
            wishCount: old.wishCount + (newWish ? 1 : -1),
          };
        });

        return { previousWish };
      },
      onError: (_err, _newWish, context) => {
        if (context?.previousWish && productId) {
          queryClient.setQueryData(
            ['wishInfo', productId],
            context.previousWish
          );
        }
      },
      onSettled: () => {
        if (productId) {
          queryClient.invalidateQueries({ queryKey: ['wishInfo', productId] });
        }
      },
    }
  );

  if (!productId || !wish) return null;

  const handleWishClick = () => {
    mutation.mutate(!wish.isWished);
  };

  return (
    <div css={barStyle}>
      <button css={wishButton} onClick={handleWishClick}>
        {wish.isWished ? (
          <AiFillHeart size={24} color="red" />
        ) : (
          <AiOutlineHeart size={24} />
        )}
        <span>{wish.wishCount.toLocaleString()}</span>
      </button>
      <button css={orderButton} onClick={() => navigate(`/order/${productId}`)}>
        주문하기
      </button>
    </div>
  );
};

export default FixedBottomBar;

export const barStyle = (theme: ThemeType) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-top: 1px solid ${theme.color.gray.gray300};
  background-color: ${theme.color.gray.gray00};
  z-index: 10;
`;

export const wishButton = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.label1Regular.fontSize};
  background: none;
  border: none;
  cursor: pointer;
`;

export const orderButton = (theme: ThemeType) => css`
  flex: 1;
  margin-left: ${theme.spacing[4]};
  background: ${theme.color.semantic.kakaoYellow};
  color: ${theme.color.semantic.textDefault};
  font-weight: ${theme.typography.body1Bold.fontWeight};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: ${theme.typography.body1Bold.fontSize};
  text-align: center;

  &:hover {
    background: ${theme.color.semantic.kakaoYellowHover};
  }

  &:active {
    background: ${theme.color.semantic.kakaoYellowActive};
  }
`;
