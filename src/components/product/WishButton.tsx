import { Heart } from 'lucide-react';
import { css } from '@emotion/react';
import { useToggleWishMutation } from '@/hooks/queries/useToggleWishMutation';
import type { ProductWish } from '@/types';
import { palette, spacing } from '@/styles/theme';

interface Props {
  productId: string;
  wishData: ProductWish;
}

export const WishButton = ({ productId, wishData }: Props) => {
  const { mutate: toggleWish } = useToggleWishMutation(productId);

  return (
    <div css={wrapper}>
      <button onClick={() => toggleWish()} css={buttonStyle(wishData.isWished)}>
        <Heart size={20} />
      </button>
      <span>{wishData.wishCount.toLocaleString()}</span>
    </div>
  );
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.spacing1};
  span { font-size: 12px; color: ${palette.gray600}; }
`;

const buttonStyle = (isWishd: boolean) => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${palette.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: ${isWishd ? palette.red500 : 'none'};
    color: ${isWishd ? palette.red500 : palette.gray600};
    transition: all 0.2s;
  }
`;
