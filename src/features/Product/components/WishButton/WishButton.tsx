import { useWish } from '../../hooks/useWish';
import * as S from './WishButton.styles';

interface WishButtonProps {
  productId: number;
}

const WishButton = ({ productId }: WishButtonProps) => {
  const { data, mutation } = useWish(productId);
  if (!data) return null;
  const { isWished, wishCount } = data;

  const handleToggleWish = () => {
    mutation.mutate(!isWished);
  };

  return (
    <S.Container>
      <button
        onClick={handleToggleWish}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="찜하기 버튼"
      >
        <S.WishIcon isWished={isWished} />
        <S.CountText>{wishCount}</S.CountText>
      </button>
    </S.Container>
  );
};

export default WishButton;
