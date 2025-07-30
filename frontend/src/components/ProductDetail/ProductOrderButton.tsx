import {
  ButtonContainer,
  OrderButton,
  WishButton,
} from '@/components/ProductDetail/ProductOrderButton.style.ts';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path.ts';
import useFetchProductWish from '@/hooks/fetch/useFetchProductWish.ts';
import { useEffect, useState } from 'react';
import heart from '@/assets/heart.svg';
import emptyHeart from '@/assets/emptyHeart.svg';

interface ProductOrderButtonProps {
  productId: number;
}

export default function ProductOrderButton({ productId }: ProductOrderButtonProps) {
  const navigate = useNavigate();
  const data = useFetchProductWish(productId);

  const sessionKey = `product-wish-${productId}`;
  const [isWished, setIsWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(sessionKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setIsWished(parsed.isWished);
      setWishCount(parsed.wishCount);
    } else if (data) {
      setIsWished(data.isWished);
      setWishCount(data.wishCount);
      sessionStorage.setItem(sessionKey, JSON.stringify(data));
    }
  }, [data, sessionKey]);

  const handleWish = () => {
    const newIsWished = !isWished;
    const newWishCount = newIsWished ? wishCount + 1 : wishCount - 1;

    setIsWished(newIsWished);
    setWishCount(newWishCount);

    sessionStorage.setItem(
      sessionKey,
      JSON.stringify({ isWished: newIsWished, wishCount: newWishCount }),
    );
  };

  if (!data) return null;

  return (
    <ButtonContainer>
      <WishButton onClick={handleWish}>
        <img src={isWished ? heart : emptyHeart} alt="찜 버튼" />
        <span>{wishCount}</span>
      </WishButton>
      <OrderButton onClick={() => navigate(`${PATH.ORDER}/${productId}`)}>주문하기</OrderButton>
    </ButtonContainer>
  );
}
