import { useToggleWish } from '@/queries/useToggleWish';
import { useWishInfo } from '@/queries/useWishInfo';
import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import { Heart } from 'lucide-react';

const Button = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
`;

const Counter = styled.p`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

interface LikeButtonProps {
  productId: number;
}

const LikeButton = ({ productId }: LikeButtonProps) => {
  const { data, isLoading } = useWishInfo(productId);
  const { mutate, isPending } = useToggleWish(productId);
  if (isLoading || !data)
    return (
      <Button>
        <Heart size={20} strokeWidth={1.5} />
        <Counter>-</Counter>
      </Button>
    );

  const { wishCount, isWished } = data;

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      <Heart
        size={20}
        strokeWidth={1.5}
        fill={isWished ? 'rgb(250, 52, 44)' : 'none'}
        color={isWished ? 'rgb(250, 52, 44)' : 'rgb(42,48,56)'}
      />
      <Counter>{data.wishCount.toLocaleString()}</Counter>
    </Button>
  );
};

export default LikeButton;
