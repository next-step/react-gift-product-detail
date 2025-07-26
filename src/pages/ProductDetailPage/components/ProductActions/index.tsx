import React from 'react';
import type { ProductHeart } from '@/pages/ProductDetailPage/types';
import * as S from './styles';

interface ProductActionsProps {
  heart: ProductHeart;
  onHeartClick: () => void;
  onOrderClick: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  heart,
  onHeartClick,
  onOrderClick,
}) => {
  return (
    <S.ButtonContainer>
      <S.Heart onClick={onHeartClick}>
        <S.HeartIcon liked={heart.isWished} viewBox="0 0 24 24">
          <S.HeartPath d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </S.HeartIcon>
        <S.HeartCount>{heart.wishCount}</S.HeartCount>
      </S.Heart>
      <S.OrderButton onClick={onOrderClick}>주문하기</S.OrderButton>
    </S.ButtonContainer>
  );
};

export default ProductActions;
