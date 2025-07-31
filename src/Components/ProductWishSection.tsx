import styled from '@emotion/styled';
import type { ProductWish } from '@/types/productDetail';

const WishButton = styled.button<{ isWished: boolean }>`
  background: ${({ isWished, theme }) => isWished ? theme.colors.red.red500 : 'white'};
  color: ${({ isWished, theme }) => isWished ? 'white' : theme.colors.gray.gray600};
  border: 1px solid ${({ isWished, theme }) => isWished ? theme.colors.red.red500 : theme.colors.gray.gray300};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2rem;

  &:hover {
    background: ${({ isWished, theme }) => isWished ? theme.colors.red.red600 : theme.colors.gray.gray100};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WishButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface ProductWishSectionProps {
  wishData: ProductWish;
  onToggleWish: () => void;
  isPending: boolean;
}

const ProductWishSection = ({ wishData, onToggleWish, isPending }: ProductWishSectionProps) => {
  return (
    <WishButtonContainer>
      <WishButton
        isWished={wishData.isWished}
        onClick={onToggleWish}
        disabled={isPending}
        aria-label={wishData.isWished ? '관심 해제' : '관심 등록'}
      >
        ❤️
      </WishButton>
      <span style={{ fontSize: '1rem', color: '#666' }}>
        {wishData.wishCount}명이 관심 등록
        {wishData.isWished && ' (내가 관심 등록함)'}
      </span>
    </WishButtonContainer>
  );
};

export default ProductWishSection; 