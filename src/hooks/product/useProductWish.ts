import { useParams } from 'react-router-dom';
import { getProductWishInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

function useProductWish() {
  const { productId } = useParams();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isWished, setIsWished] = useState<boolean>(false);

  const { data: productWish } = useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => getProductWishInfo(Number(productId)),
  });

  useEffect(() => {
    if (productWish) {
      setLikeCount(productWish.wishCount);
      setIsWished(productWish.isWished);
    }
  }, [productWish]);

  function handleLikeClick() {
    if (isWished) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsWished((prev) => !prev);
  }

  return {
    likeCount,
    isWished,
    handleLikeClick,
  };
}

export default useProductWish;
