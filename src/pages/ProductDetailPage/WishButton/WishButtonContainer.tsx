import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import WishButton from './WishButton';
import { useState, useEffect } from 'react';
import { fetchWishCount } from '@/api/products';

interface WishButtonContainerProps {
  productId: number;
}

const WishButtonContainer = ({ productId }: WishButtonContainerProps) => {
  const { data: wishRes, error: wishError } = useReactQueryFetch(['wishCount', productId], () =>
    fetchWishCount(productId)
  );

  const [wishCount, setWishCount] = useState(0);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (wishRes) {
      setWishCount(wishRes.wishCount);
      setIsWished(wishRes.isWished);
    }
  }, [wishRes]);

  const handleWishToggle = () => {
    setIsWished((prev) => !prev);
    setWishCount((prev) => prev + (isWished ? -1 : 1));
    // 찜 토글 API
  };

  if (wishError) {
    return null;
  }

  return <WishButton wishCount={wishCount} isWished={isWished} onClick={handleWishToggle} />;
};

export default WishButtonContainer;
