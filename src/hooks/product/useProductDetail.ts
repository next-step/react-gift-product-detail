import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import useProductBasicInfo from './useProductBasicInfo';
import useProductDetailInfo from './useProductDetailInfo';
import useProductReview from './useProductReview';
import useProductWish from './useProductWish';

function useProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginInfoContext);
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  const { productBasicInfo } = useProductBasicInfo();
  const { productDetailInfo, isLoading: isDetailLoading } = useProductDetailInfo();
  const { productReviewInfo } = useProductReview();
  const { likeCount, isWished, handleLikeClick } = useProductWish();

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
    handleLikeClick,
    handleOrderClick,
    handleItemClick,
  };
}

export default useProductDetail;
