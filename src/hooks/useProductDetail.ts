import { useParams } from 'react-router-dom';
import { getProductBasicInfo } from '@/apis/product';
import { getProductDetailInfo } from '@/apis/product';
import { getProductHighlightReview } from '@/apis/product';
import { getProductWishInfo } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';

function useProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginInfoContext);
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  const { data: productBasicInfo } = useQuery({
    queryKey: ['productBasicInfo', productId],
    queryFn: () => getProductBasicInfo(Number(productId)),
  });
  const { data: productDetailInfo, isLoading: isDetailLoading } = useQuery({
    queryKey: ['productDetailInfo', productId],
    queryFn: () => getProductDetailInfo(Number(productId)),
  });
  const { data: productReviewInfo } = useQuery({
    queryKey: ['productReviewInfo', productId],
    queryFn: () => getProductHighlightReview(Number(productId)),
  });
  const { data: productWish } = useQuery({
    queryKey: ['productWish', productId],
    queryFn: () => getProductWishInfo(Number(productId)),
  });

  const [likeCount, setLikeCount] = useState<number>(0);
  const [isWished, setIsWished] = useState<boolean>(false);

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

  function handleOrderClick() {
    return navigate(`/order/${productId}`);
  }

  function handleItemClick(itemId: number) {
    if (userInfo.email === '') {
      navigate('/login');
    } else {
      navigate(`/product/${itemId}`);
    }
  }

  return {
    activeTab,
    likeCount,
    setActiveTab,
    isWished,
    productBasicInfo,
    productDetailInfo,
    isDetailLoading,
    productReviewInfo,
    productWish,
    handleLikeClick,
    handleOrderClick,
    handleItemClick,
  };
}

export default useProductDetail;
