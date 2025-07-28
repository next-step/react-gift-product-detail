import { useParams } from 'react-router-dom';
import { getProductBasicInfo } from '@/apis/product';
import { getProductDetailInfo } from '@/apis/product';
import { getProductHighlightReview } from '@/apis/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function useProductDetail() {
  const { productId } = useParams();
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
  return {
    activeTab,
    setActiveTab,
    productBasicInfo,
    productDetailInfo,
    isDetailLoading,
    productReviewInfo,
  };
}

export default useProductDetail;
