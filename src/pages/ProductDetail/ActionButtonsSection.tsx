import React from 'react';
import {
  WishButton,
  WishIcon,
  WishCount,
  OrderButton,
} from './ProductDetail.styles';
import type { ProductWish } from '@/types/product';

interface ActionButtonsSectionProps {
  productWish?: ProductWish;
  onWishToggle: () => void;
  onOrderClick: () => void;
  isWishPending: boolean;
}

const ActionButtonsSection: React.FC<ActionButtonsSectionProps> = ({
  productWish,
  onWishToggle,
  onOrderClick,
  isWishPending,
}) => {
  return (
    <>
      <WishButton
        isWished={productWish?.isWished || false}
        onClick={onWishToggle}
        disabled={isWishPending}
      >
        <WishIcon isWished={productWish?.isWished || false}>♥</WishIcon>
        <WishCount>{productWish?.wishCount || 0}</WishCount>
      </WishButton>
      <OrderButton onClick={onOrderClick}>주문하기</OrderButton>
    </>
  );
};

export default ActionButtonsSection;
