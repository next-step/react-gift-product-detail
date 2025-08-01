import { useWish } from '@/features/Product/hooks/useWish';
import * as S from './WishButton.styles';

interface WishButtonProps {
  productId: number;
}

const WishButton = ({ productId }: WishButtonProps) => {
  const { data, mutation } = useWish(productId);
  if (!data) return null;
  const { isWished, wishCount } = data;

  const handleToggleWish = () => {
    if (mutation.isPending) return;
    mutation.mutate(!isWished);
  };

  return (
    <S.Container>
      <S.IconButton onClick={handleToggleWish} aria-label="찜하기 버튼">
        <S.WishIcon src={S.heartButtonSrc} isWished={isWished} />
        <S.CountText>{wishCount}</S.CountText>
      </S.IconButton>
    </S.Container>
  );
};

export default WishButton;
